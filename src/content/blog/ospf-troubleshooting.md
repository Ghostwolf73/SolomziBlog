---
title: "OSPF troubleshooting"
date: 2024-07-18
tags: ["routing"]
summary: "Troubleshooting…yeah on this post I am dealing with OSPF troubleshooting. I found an OSPF lab that is misconfigured on purpose, I have to find out why..."
readTime: "3 min"
---

Troubleshooting…yeah on this post I am dealing with OSPF troubleshooting. I found an OSPF lab that is misconfigured on purpose, I have to find out why things aren't working and make them work, I need to see those pings going through. Below is the topology I will be working with. I will be writing while I troubleshoot so everything will be in the present tense.

![](/images/2024/07/screenshot-2066.png)

The goal is for PC1 to ping PC2. The commands I will use in this lab mostly are:

#Show running config #Show ip route #show ip ospf #show ip ospf neighbor #show ip ospf interface #show ip ospf database #show ip route ospf #debug ip ospf

Firstly I checked the configurations on the PC do they have IP addresses? here is what I have.

![](/images/2024/07/screenshot-2024-07-17-165612.png)
![](/images/2024/07/screenshot-2024-07-17-165632.png)

PCs both have IP addresses that they got via DHCP, next let's see if they can ping their gateways first.

![](/images/2024/07/screenshot-2024-07-17-165655.png)
![](/images/2024/07/screenshot-2024-07-17-165709.png)

Both can reach their respective gateways, next, can they ping each other(obviously no otherwise the lab would be pointless) I will check anyway.

![](/images/2024/07/screenshot-2024-07-17-165739.png)

The host is unreachable, alright now that we have that out of the way, it is time to check the routers.  
Route 1 is first of course. For all the routers I first have to run a no-IP domain and logging synchronous because those 2 are not configured. I wouldn't say I like working with a device without those, especially the domain lookup because it is so annoying to get that error because of a typo.

![](/images/2024/07/screenshot-2024-07-17-165817.png)

Now onto the real business, let's look at the routing table.

![](/images/2024/07/screenshot-2024-07-17-170001.png)

Zero Ospf routes found, we only have connected and local routes. Next, I will run a show run to check the configurations and find out if OSPF is even configured if IP addresses are configured too.

![](/images/embedded/ospf-troubleshooting-embedded-1.png)

We do have IP addresses configured.

![](/images/2024/07/image.png)

OSPF is also configured but I think I have seen the first problem, the network OSPF advertises is not right. I should fix this but I have an ich to just check and make sure the interfaces are up…

Interfaces are up and running!

Next I want to see the OSPF configuration...

![](/images/2024/07/screenshot-2024-07-17-170159.png)

Quite a lengthy output but that's how it is. Next, let's see if we have any neighbors (i know we don't)

![](/images/2024/07/screenshot-2024-07-17-170244.png)

Zero! nothing, check the ospf interface? yes!

![](/images/2024/07/screenshot-2024-07-17-170311.png)

With this, we can see what I mentioned above, that the network command was wrong that is why on the show ip OSPF int we only see Eth0/1 because the router doesn't know which interface has 10.0.12.0/24. Let's fix that now.

![](/images/2024/07/image-1.png)

Now onto router 2, let's run a show run command and see what we find.

![](/images/2024/07/image-2.png)

Interfaces have IP addresses and though it does not affect us right now we will have to deal with Eth0/1 and change its state to up.

![](/images/2024/07/image-3.png)

OSPF is configured but the area is very wrong and bingo! that might be our problem. Let's see.

![](/images/2024/07/image-4.png)

Okay but no adjacency formed, so I looked at both interfaces side by side.

![](/images/2024/07/image-5.png)

The IP address is completely wrong, these two are not in the same network R1 interface is 10.1.22.x whilst R2 is 10.0.12.x so let's fix that right now and fix that OSPF command.

![](/images/2024/07/image-7.png)

I thought this was going to work and I almost panicked when I didn't see the log for a neighborship forming so I calmed down and went through the show ip ospf int on both routers, look what I found on R1.

R1 is configured as a /30 network and this was something I didn't see because I could ping R2, now let's fix that.

![](/images/2024/07/image-8.png)

Now look at that, we are up, smile on my face. Lets check our routes now.

![](/images/2024/07/image-9.png)

The two routes have exchanged routes we are moving in the right direction.  
Now I will cut this post here, I thought I'd do the whole lab in one post but I have realized it's going to be too long so I'll be doing 2 routers per post.

![](/images/embedded/ospf-troubleshooting-embedded-2.png)

To be continued...
