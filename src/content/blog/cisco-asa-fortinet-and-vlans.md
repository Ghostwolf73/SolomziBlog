---
title: "Cisco ASA, Fortinet and VLANs"
date: 2024-10-11
tags: ["switching", "ccnp", "ccna", "homelab"]
summary: "Okay, we are going to be working on these 2 devices now. I will start with the ASA which we will also use as a DHCP server. Let's get to get to it. I have..."
readTime: "5 min"
---

![](/images/2024/10/image-37.png)

Okay, we are going to be working on these 2 devices now. I will start with the ASA which we will also use as a DHCP server. Let's get to get to it.

**I have to say this is my first time working with an ASA device so I will be using Google a lot and I will be learning too.**

![](/images/2024/10/image-38.png)

Already, things are looking quite strange. We are in new lands, ladies and gentlemen, but we'll push through. I have changed the state of the port connected to the switch to up. Now, I have to make it a trunk, ROAS type of thing.

![](/images/2024/10/screenshot-2024-10-10-133744.png)

Okay, so from my reading, on Cisco ASA, we do not need to explicitly configure the trunk like we do with routers and switches. Here, we configure the subinterfaces, and trunking is handled by them. Each subinterface will correspond with a VLAN.

Second command we are specifying the VLAN ID that is going to be associated with this subinterface and in this case it's VLAN 30.

Thirdly we assign a name to the subinterface(Nameif = name interface) this is crucial in ASA because interfaces are referred to by their logical names in configurations such as routing, ACL, and security policies.

ASA security levels range from 0 - 100, 0 being the most lenient and 100 being the strongest, I don't understand why Cisco would have 0 as a default but who am I? So I changed it to 100, from my reading a higher security level allows traffic to flow more freely between interfaces with lower security levels but not the other way around.

Last but not least I gave the IP address to the subinterface, I don't think I should explain this.

We are going to do the exact same thing for VLAN 50 and 100.

![](/images/2024/10/image-40.png)

Next some DHCP configurations.

![](/images/2024/10/image-41.png)

Okay, I think I should explain one part of the commands which is "dhcpd" We have a d and I was wondering what it's for and it stands for daemon, this got me so excited because A few months back I found out that daemons exist and I was fascinated with them and today I get to see one work on my lab directly, well they always do but this one I know and I was responsible. A daemon is a process running in the background of Unix systems that does tasks behind the scenes without user interaction so here I am using the DHCP daemon, I am so happy😊

Now let's see if things work, let's try to get IP addresses for PC3 and 5 then do a ping.

![](/images/2024/10/image-42.png)

I am failing, I am doing something wrong.

![](/images/2024/10/image-43.png)

I am such a fool, I always started my configurations from scratch because I thought I had done something only to realize that the switches where these PC's are connected weren't on so there was no way for the PC's to send their requests to.

![](/images/2024/10/image-44.png)

New problem, we cannot ping the other PC.

So I just learned that by default Cisco ASA does not allow traffic to flow between interfaces that have the same security level, the firewall assumes that these interfaces are meant to be separated. So to allow that we run one command which is this:

![](/images/2024/10/image-45.png)

and...

![](/images/2024/10/image-46.png)

Nice, now we going to Fortinet.

![](/images/2024/10/screenshot-2024-10-10-144514.png)

The following part took me hours, I couldn't connect to the FortiGate firewall so that I could use its GUI but after trying everything I could, chatgpt, google search after Google search I found a solution, look at my tabs.

![](/images/2024/10/image-48.png)

You have to get used to google in tech because you won't know everything. Now the plan is to create subinterfaces using the GUI, subinterfaces for VLAN20, 40, and 100 and configure them as DHCP servers. My PC is barely hanging on, my RAM is not enough to run so many devices so I will be quick, take screenshots, and move on.

![](/images/2024/10/screenshot-2024-10-10-180741.png)

I ran into another dumb problem.

![](/images/2024/10/image-50.png)

PC2 and 4 couldn't get IP addreses via DHCP and I had to troubleshoot again! So I looked at my topology, checked my configs at the switches then I realised something

![](/images/2024/10/image-51.png)

Port e0/3 on SW3 I don't remember making it a trunk interface, so I went to SW3, ran a show command..

![](/images/2024/10/image-52.png)

And yep I only made e0/0 trunk, how was I expecting these frames to be carried on a port that is not a trunk when they are tagged with VLANs? rookie mistake, so I went to fix this...

![](/images/2024/10/image-53.png)

Now look at this...

![](/images/2024/10/image-54.png)
![](/images/2024/10/image-55.png)

I got my IP addresses! Now let's do the ritual, a ping.

![](/images/2024/10/image-56.png)

Not going through and I suspect it has something to do with the firewall so let me fix that on the Fortinet.

![](/images/2024/10/image-57.png)

Yes, you see we have an implicit deny, so we need to add a few lines like an ACL.

![](/images/2024/10/image-58.png)

Now let's ping again.

![](/images/2024/10/image-59.png)

Done!

Now we are almost done, I just need to add static routes on SW4-L3, R1, ASA and Fortinet, I could use a dynamic routing protocol but I am lazy and tired I don't want to be dealing with OSPF. I won't show these commands because I have this before.

After configuring the static routes I went back to the Fortinet firewall to add more firewall policies.

![](/images/2024/10/image-60.png)

I could make these policies more complicated and play around with what I block and allow, but not for this lab. Maybe in the future, I will dedicate a lab to Fortinet firewalls.

After I ran multiple pings to different subnets to check if I can connect to every corner of the net and here are the results.

![](/images/2024/10/image-61.png)

Everything is connnected and working fine.

I was thinking of connecting the lab to the internet, but to be honest, I am now tired. I have been working on this lab and post for hours. It's quite challenging to troubleshoot and write everything down for a blog post, and I kept running into many hurdles, so I had to spend a lot of time on Google, too. But this was fun and taught me a lot. I hope it teaches someone out there a thing or two.

Catch you next time!
