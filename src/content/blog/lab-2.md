---
title: "LAB 2"
date: 2023-01-18
tags: ["lab", "ccna"]
summary: "In this second lab, I'll be diving into more networking protocols and their configurations. Each PC will be a representation of 100 users. The idea is to..."
readTime: "2 min"
---

![](/images/2023/01/screenshot-from-2023-01-18-19-27-05.png)

In this second lab, I'll be diving into more networking protocols and their configurations. Each PC will be a representation of 100 users. The idea is to have 3 different branches connected to the same ISP which is the blue cloud on the topology and that ISP will connect to the internet. I will try to include as many devices as I can in the future, I will add servers or end users that will represent servers and add static routes amongst these networks and some dynamic routes with OSPF, it's gonna be interesting.

I plan to spend a week or two on this lab project, I will add or remove some things as I learn since I am now studying for CCNP. I plan to add a few firewalls that are if they won't require a lot of hardware.

So far I have only one branch which is shaded purple, the other two will be similar just that one will be made up of nothing but servers. I will use routers as DHCP servers and I am excited about these configurations.

So what have I done so far? I have done some basic configs to the switches which include hostname, passwords, banner motd, and basic port security. I then configured EtherChannel which I will make a post on tomorrow but if you look at the picture you can see the switches are connected in 2 cables, that's what EtherChannel is for and all 3 switches are connected creating redundancy to the router, I manipulated the STP elections to make SWITCH(one that has a different symbol) the root for the two VLANs 10 and 20 then L3-SWITCH as the root for the rest. This was all made possible per the VLAN spanning tree, I will make a post on these configurations.

I am excited about this lab and everything around it and I can't wait to write about it, thank you for reading catch you on the next post.
