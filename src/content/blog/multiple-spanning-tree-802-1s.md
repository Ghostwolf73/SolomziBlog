---
title: "Multiple Spanning-Tree, 802.1s"
date: 2023-02-03
tags: ["switching", "ccnp"]
summary: "Today I did MST, I can say I understand it a bit but I can’t define or explain some of its terms though I do know how it works and what it does. MST maps..."
readTime: "3 min"
---

Today I did MST, I can say I understand it a bit but I can’t define or explain some of its terms though I do know how it works and what it does.

MST maps one or multiple VLANs into a single STP tree called an MST instance, MSTI in short. MST has a special instance called internal spanning tree(IST), this is like the default instance, one does not create it it’s there by default, and its instance is 0. Cisco supports 16 instances but remember instance 0 is already taken so one can create instances from 1-15.

We then have a group of MST switches in something called a region.

I built a small lab to practice MST and configure it, the lab has 3 switches, 100 VLANs on each switch, and I wanted vlans 1-50 to have their instance whilst VLANs 51-100 have their own, this means each instance has its own root bridge and so on.

![](/images/2023/02/screenshot-7.png)

I will first outline the steps to configuring MST then I will show screenshots of my configurations.

Step 1, define MST:

![](/images/2023/02/screenshot-8.png)

Step 2, which is optional defines MST instance priority and this has two methods

1. Using a priority number like “priority 0”
2. Using primary or secondary

I didn't configure this, I did it differently, which I will show below.

Step 3, go to MST sub-configuration mode and associate VLANs with their instances. Below I will show the show run results on all the 3 switches then explain what I did.

![](/images/2023/02/screenshot-9.png)

Above are the configurations for L2-SW, which is the switch on the bottom left. What I did there is quite simple, I entered the MST configuration mode with the command #spanning-tree mst configuration

Inside that config mode, I gave my region a name with the command #name SmileTech and specified my revision with the command #revision 1, this must match on all switches.

I then assigned VLANs to their instances.

Then below are the configurations on L3-SW1:

![](/images/2023/02/screenshot-10.png)

Remember we also do the spanning-tree mode MST here, on all switches, and have the VLANs created too. From the screenshot, the first half of the commands are identical to what I did on L2-SW what's important is the second half, firstly I made this switch the root bridge of instance 1 and the secondary of instance 2, like so:

![](/images/2023/02/screenshot-11.png)

This means VLANs 1 to 50 use L3-SW1 as their root bridge whilst VLANs 51-100 have a different root bridge and I can confirm this by running this command:

![](/images/2023/02/screenshot-12.png)

As it shows VLAN 47 shows that 'this switch is the root bridge' whilst VLAN 73 points to a different root bridge.

Here is what I did on L3-SW2, identical to what I did on L3-SW1 difference is here instance 1 is the secondary whilst instance 2 is the primary which means this switch is the root bridge for instance 2.

![](/images/2023/02/screenshot-14.png)

Then when we run the show spanning tree vlan command we get this:

![](/images/2023/02/screenshot-15.png)

As it's shown, here VLAN 73 says this switch is the root bridge whilst VLAN 47 points to another switch which we know is L3-SW1.

That’s it, nothing more and then we have commands to check MST and troubleshoot it. I will put links to where I got to learn about MST below.

https://youtu.be/vsU7eoEBkd4

From this youtube channel, please go to youtube watch and like the video it doesn't belong to me but it helped me a lot.

and then the CCNP official cert guide.
