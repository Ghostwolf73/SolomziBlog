---
title: "HSRP done by a noob"
date: 2023-02-20
tags: ["routing", "ccnp", "ccna"]
summary: "A few blog post back I wrote about etherchannel, I talked about why we need redundancy and how etherchannel deals with that today I am gonna talk about..."
readTime: "4 min"
---

A few blog post back I wrote about etherchannel, I talked about why we need redundancy and how etherchannel deals with that today I am gonna talk about redundancy on routers.

![](/images/2023/02/screenshot-56.png)

From the picture you can tell there is a difference in the topology compared to the one I used on the "lab 2" post, this is because I added a second router for redundancy so now I have 2 routers that act as the border for the network and for this to be possible I used a protocol called HSRP.

Firstly as usual what is HSRP? In my own words(words of a noob) HSRP which stands for *Hot Standby Router Protocol* is CISCO proprietary protocol used for redundancy for a network, this means we have a backup gateway to our network. So using the topology above we have 2 VLANs and with ROAS they normally would go through one router as a gateway to the outside networks but with HSRP we make it possible for us to have a "backup" router that takes over just in case the one we have as the gateway fails. HSRP also makes it possible that we load balance our traffic on the above topology we can make 1 router carry traffic for VLAN 10 whilst the other carries VLAN 20 traffic and each of these routers would have the ability to carry both VLANs in the case that one of them goes down.

To configure HSRP we do all our configs on the interface we want to be the gateway because the end devices have no idea that 2 routers act as the gateway so how does it work then? it's simple we configure a virtual gateway that these 2 routers would both share, these routers will also have a virtual MAC address. For more explanation I will put a link to an article written by people with more experience and knowledge than me, remember I am not a teacher, I just document what I learn on my journey. Read more about HSRP theory on this Geeks for geeks post.

https://www.geeksforgeeks.org/hot-standby-router-protocol-hsrp/

Now on to the configurations, I configured the routers a few days back so I will run a show run command then try and give a brief explanation on each command.

![](/images/2023/02/screenshot-57.png)

For this topology, I used sub-interfaces since I wanted to use ROAS(router on a sticker) so the first thing is to create these subinterfaces with the interface ID then a dot and a number for the new subinterface which I already had a post about. We give the sub-interface an IP address on the subnet which it's a gateway to then our first command "standby version 2" just means we are using version 2 of HSRP. We then use the command standby with an ID, here I used 1 as the ID and then 10.0.10.1 as that "virtual IP address" so what we did here is to create a standby called 1 and then gave it an IP address. Next, we have the command "standby 1 priority 150" the default priority is 100, and just like STP the higher the priority the more preferred the device, so here we have set our priority to 150. The last command "standby 1 preempt" just means no matter what this router should be the "Active router" which means it's the main one. So it means if we have preempt if R1 goes down and R2 takes over then R1 comes back up, and R2 will go back to being standby whilst R1 becomes active again.

Next, we configure HSRP on the second sub-interface which is for VLAN 20, the configurations are almost the same, the difference is here we didn't change the priority we just gave the standby an IP address which means we want to make this router be the standby on VLAN 20 instead of being the active router. Below I will show the configs on R2 where sub-interface 20 is configured like how we configured sub-interface 10 on R1, which means R2 is the active router for VLAN 20 subnet whilst it's on standby for VLAN 10.

![](/images/2023/02/screenshot-58.png)

With these configurations it means we configured HSRP and had it load balance traffic, R1 primarily carries VLAN 10 traffic whilst R2 carries VLAN 20 traffic and if any of the two fails the other takes over and carries traffic for both VLANs.

My explanation might be all over the place but I hope I got the point across and gave an idea on what HSRP is and what it does.

Again thank you for reading.
