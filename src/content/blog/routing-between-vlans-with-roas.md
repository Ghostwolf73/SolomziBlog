---
title: "Routing between VLANs with ROAS"
date: 2023-01-13
tags: ["routing", "ccna"]
summary: "By default when VLANs are created and PCs are added to them a PC in VLAN 10 can't access one on VLAN 20 but what if we want to share data between the two..."
readTime: "2 min"
---

By default when VLANs are created and PCs are added to them a PC in VLAN 10 can't access one on VLAN 20 but what if we want to share data between the two VLANs? That's where Router on a stick(ROAS) comes in. ROAS is one of the methods to route between VLANs and it is the one I used in my lab, I will use the other methods in the future.  
So how do we configure ROAS? it's very simple, we use something called subinterfaces, which is when we take an interface and break it into multiple interfaces. This simply means we have virtual interfaces and these interfaces are what's gonna be the gateway for each VLAN. Below is the command for creating a subinterface:

![](/images/2023/01/screenshot-from-2023-01-13-20-51-02.png)

You type the name of the interface which you wanna break down into subinterfaces then add a . and a number, I usually put the number of the VLAN so that things match but you can put any number. Now when you are under the subinterface you have to configure it as follows:

![](/images/2023/01/screenshot-from-2023-01-13-20-54-41.png)

Firstly we use the encapsulation dot1Q command and add the VLAN number so that the subinterface is associated with that VLAN, here it's important to put the right number because it's the VLAN ID, not some random number. Finally, you add an IP address and it has to be in the same subnet as what you used on the VLAN. To move the sub-interface up up you just need to "no shutdown" the main interface and all its subinterfaces will be up by default.  
Those are all the configurations we need on the router, next step is to change the switch port that connects to the router and make it a trunk port so that it carries multiple VLANs. Configuring a port to be a trunk is also simple and the next screenshot shows those configurations.

![](/images/2023/01/screenshot-from-2023-01-13-21-12-30.png)

The first command works on old switches(i have never used newer ones) but on the newer switches they say you just need the second command which is simply telling the switch that "make this port a trunk"  
That's how you configure ROAS and route between VLANs.

Thank you for reading.
