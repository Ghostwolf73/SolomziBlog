---
title: "Office Lab Pt.2(Fortinet OSPF, DHCP Relay and policies)"
date: 2025-01-16
tags: ["routing"]
summary: "This one took some time to develop because I had a lot of learning and troubleshooting to do along the way. We are continuing where we left off with our..."
readTime: "3 min"
---

This one took some time to develop because I had a lot of learning and troubleshooting to do along the way. We are continuing where we left off with our Office lab. In this post, we'll cover the configuration of OSPF, DHCP Relay and update the firewall policies.

![](/images/2025/01/image-9.png)
![](/images/2025/01/image-10.png)

We are going to start with L3 Switch which is connected to 4 PC's under 2 VLANs(30 & 40) For the L3 Switch configs I will just show a screenshot of the show run command because everything configured there we have done and covered in previous projects.

![](/images/2025/01/image-11.png)

Now we go back to the firewall, here we are going to configure OSPF, objects, and zones to help connect the VLANs 30 and 40 to the internet. Now let's hop into our firewall using the management PC.

![](/images/2025/01/image-12.png)

First we go to the network tab and then click OSPF.

![](/images/2025/01/image-13.png)

These are our configs, nothing difficult, way easier than Cisco in my opinion.  
Next, we need to configure objects for VLAN 30 and 40, add the port that connects to the L3SW to a zone, and then edit the policy we have to allow VLAN 30 and 40 to go to the internet.

![](/images/2025/01/image-14.png)

We go to the policy and objects tab then addresses then create new:

![](/images/2025/01/image-15.png)
![](/images/2025/01/image-16.png)

We are using the LACP LAN zone because we assigned the port that connects to the L3SW to that zone for better management:

![](/images/2025/01/image-17.png)

As you can see Port3 is under the LACP LAN zone.

Now this is how our policy looks like:

![](/images/2025/01/image-18.png)

We created an address group for VLAN 30 and 40(L3-VLANs) and then added it on the source, how did we create an address group? not hard...

![](/images/2025/01/image-19.png)

We click that plus sign.

![](/images/2025/01/image-20.png)

Create.

![](/images/2025/01/image-21.png)

of course we click address group.

![](/images/2025/01/image-22.png)

Give the group a name then add the members, in this case, it was the two VLANs. We are done with that. I won't show the connectivity yet because when I was initially configuring I had L3 SW as the DHCP and did all the testing but removed it because we have a dedicated DHCP server so I will show the connectivity after we configure the DHCP. As you can see for now the L3SW has a DHCP relay configured.

Of course I cannot afford a DHCP server so we use a Cisco router, here are the commands running on it, remember the network diagram? just for recap:

![](/images/2025/01/image-23.png)

That is our DHCP Server, now for the configs:

![](/images/2025/01/image-24.png)
![](/images/2025/01/image-25.png)

It covers all the subnets we have. Now lets ask for an IP address from vlan 30 and 40 then try accessing the internet.

VLAN 30:

![](/images/2025/01/image-26.png)

Connectivity check:

![](/images/2025/01/image-27.png)

VLAN 40:

![](/images/2025/01/image-28.png)

Connectivity:

![](/images/2025/01/image-29.png)

Nice!

We received IP addresses for VLAN 30 and 40 because, remember, we configured the DHCP relay on L3SW. But what about the rest of the VLANs? they don't have a L3 device between them and the gateway. Well, now we configure the DHCP relay on the Fortinet firewall.  
First, we go to the interface connecting to the VLANs we want to cover.

![](/images/2025/01/image-30.png)

We go to edit, and do this for both VLANs.

![](/images/2025/01/image-31.png)

Then, on DHCP server settings, switch mode to relay and put the DHCP server address. Yes, it's that simple.

I will just show one PC to avoid repetition.

DHCP request:

![](/images/2025/01/image-32.png)

Connectivity:

![](/images/2025/01/image-33.png)

And everything is looking good.

I wanted to finish the whole lab on this post, but it's now too long, so I will save the server-side configs for the next post.

![](/images/2025/01/image-34.png)

We'll cover this part of the topology on the next post which is going to be the final post for this particular lab.

Catch you on the next post.
