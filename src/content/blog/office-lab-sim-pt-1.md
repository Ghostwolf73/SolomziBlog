---
title: "Office Lab Sim, Pt. 1"
date: 2025-01-03
tags: ["routing"]
summary: "Okay this is going to be interesting, we have 13 PC's, 6 Servers(Syslog, NTP, TFTP, Radius, DHCP and Web Server), 3 switches, one cisco L2, one cisco L3..."
readTime: "5 min"
---

Okay this is going to be interesting, we have 13 PC's, 6 Servers(Syslog, NTP, TFTP, Radius, DHCP and Web Server), 3 switches, one cisco L2, one cisco L3 and one Aruba and all these 3 connect to our Fortinet firewall which acts as our gateway and firewall. Here is the topology below.

![](/images/2025/01/image.png)

I will break this lab into parts because what we have to config is a lot, The first part which is this post is going to be a setup, we take a look at the basic configs running on the devices, what we plan to do, and so on.

So let's look at the central part of our lab which is the Fortinet firewall and here we can see it connects to SW10 which is a Cisco L2 switch and it uses Etherchannel, LACP to be specific which we have touched on [here](https://solomzi4.wordpress.com/2023/01/20/etherchannel-from-a-noob/) and then it connects to another L2 cisco switch which we'll call the management and servers side, it goes on to connect to another LAN, one we will call Aruba LAN and finally connects to the L3 Switch where we have OSPF as our routing protocol.

Here are the basic config for the firewall using the CLI:

![](/images/2025/01/screenshot-2025-01-02-181801.png)

There is nothing new here, basic configs, just a setup, next we have to access the firewall using the MGMT PC which is configured with an IP address in the same subnet as the Firewall. This PC is where we'll spend most of our time because we'll do our configs over the GUI instead of the CLI.

Now straight to our MGMT PC. First, we'll start by creating the EtherChannel interface:

![](/images/2025/01/image-1.png)

We go to interfaces, create a new, interface, and here are the configs:

![](/images/2025/01/image-2.png)

From that screenshot, you can see we added ports 2 and 6 as the members of that Etherchannel and then the interface type is 802.3ad which is the industry standard for Link Aggregation. For the rest of the configs, you leave as they are and press okay.

![](/images/2025/01/image-3.png)

And now we have that interface added. Next, we add the VLANs, which are going to be carried by that interface, and here is how we add them.

![](/images/2025/01/screenshot-2025-01-02-185300.png)

We go to interface again, create new, interface:

![](/images/2025/01/screenshot-2024-12-29-175932.png)

Interface type is going be VLAN.

![](/images/2025/01/screenshot-2024-12-29-183707.png)

Here we give the VLAN name, ID, which port or interface it is going to use(our LACP port), and then we give the IP address for that particular VLAN, and we are done. We do the same process but for VLAN 20.

Next, we configured the VLANs on the switch, I won't show that because we have gone through VLAN configuration a lot of times, what must happen though is these devices should get IP addresses dynamically according to their respective VLANs and here it goes.

![](/images/2025/01/image-4.png)

We can ping our gateway, we do the same for PC12 which is on the same subnet and we can ping between the two just to double-check.

![](/images/2025/01/image-5.png)

Now for VLAN 20:

![](/images/2025/01/image-6.png)
![](/images/2025/01/image-7.png)

Nice! done with step one.

Now we are going to move away from Fortinet for just a bit, we are going to configure the Aruba Switch, nothing big just VLANs, VLAN access, and the trunk port. I realized I have never configured Aruba here so I will show the commands, though they are quite similar, or let me say these particular commands are identical to the Cisco ones.

![](/images/2025/01/screenshot-2024-12-24-165128.png)

So as a summary, we created VLAN 70 and 80, interfaces 1/1/3 and /3 belong to VLAN 70 then 1/1/4 and /5 belong to VLAN 80 and then we have interface 1/1/1 as our trunk interface to carry our VLANs.

Next, we configure port7 on the firewall to carry the two VLANs(70 and 80) just like we did with the LACP link, I won't show that because the process is the same so that would be redundant. Behind the scenes I also configured a firewall policy to allow our management PC to access the internet, we did that on the last post which is why I did it behind the scenes.

Next is inter-VLAN routing, last time I did intervlan routing I configured multiple policies on interfaces but this time I will use zones, this is a method that's also new to me and I found it the easiest.

So what is a zone? Well, it is also similar to a VLAN because it is a logical grouping of interfaces, we use zones to group similar interfaces, simplify management, and more. Now let's get to the configurations.

As usual we go to interfaces, create new:

![](/images/2025/01/screenshot-2025-01-02-185300-1.png)

Click "zone"

![](/images/2025/01/screenshot-2025-01-02-185508.png)

You can name it whatever you want and then we add the interfaces we want for this zone in this case it's VLAN 10 and 20, and now we have these VLANs logically grouped which means they should be able to communicate, let's see.

![](/images/2025/01/screenshot-2025-01-02-185559.png)

We still cannot ping VLAN 20 from VLAN 10, I did this on purpose, if you look at the screenshot above we have something called block intra-zone traffic and it toggled on, you have to toggle it off like so:

![](/images/2025/01/screenshot-2025-01-02-185521.png)

Now lets ping:

![](/images/2025/01/screenshot-2025-01-02-185611.png)

And we are through. I have 2 zones configured:

![](/images/2025/01/screenshot-2025-01-02-185712.png)

The last task for this post is to connect these 2 VLANs to the internet, we do this by configuring a firewall policy and we'll use our zones on these policies, here is how the config is going to look like:

![](/images/2025/01/screenshot-2025-01-02-193229.png)

We do the same for VLAN 70 & 80, let's check our internet connection now.

![](/images/2025/01/image-8.png)

And all our PCs have access to the Internet.  
We'll continue the rest of the lab in the next 2 or 3 posts, hope you had a good read and if you have any questions you can contact me.

Catch you on the next!
