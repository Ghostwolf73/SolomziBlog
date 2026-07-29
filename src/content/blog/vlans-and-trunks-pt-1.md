---
title: "VLANs and Trunks PT. 1"
date: 2024-10-09
tags: ["security"]
summary: "I haven't posted in a while, it looks like being consistent is hard, who would've thought? Today I bumped into a lab on PNET called VLANs and Trunks, the..."
readTime: "6 min"
---

I haven't posted in a while, it looks like being consistent is hard, who would've thought? Today I bumped into a lab on PNET called VLANs and Trunks, the lab seems cool, to be honest, and that is why I wanted to give it a try.

![](/images/2024/10/image.png)

I mean look at that topology, pretty isn't it? So my next series will be my road to configuring the whole topology, hopefully, it's not a long one so let's get to it!

We start with sw2, and as usual, we run the show run command to check what has been configured already then take it from there.

![](/images/2024/10/image-1.png)
![](/images/2024/10/screenshot-2024-10-08-153552.png)

Okay, a lot is going on here, we have the hostname, IP domain name, STP configured with Per VLAN Spanning Tree, VLAn 1 has an IP address, we have an HTTP server, SSH(I knew it as soon as I saw the username configuration and IP domain), we also have logging synchronous on line console 0 which is good, I am surprised there's no IP domain lookup disabled but I will do that one myself, we also have the vty lines 0 4 configured to log in locally using the username and the transport is SSH which means we can't telnet, a good choice because Telnet is old and not safe at all!

According to the lab description these switches use VTP so I had to check how it is configured on SW2 and here is what I found:

![](/images/2024/10/image-2.png)

Before I go further I think I should explain VTP a bit, VTP stands for VLAN Trunking Protocol, a very misleading name because VTP is NOT a trunking protocol, I repeat **VTP IS NOT A TRUNKING PROTOCOL!** It is instead a Cisco Proprietary protocol that is used to copy VLANs across a network. So let's say we have 100 switches and they have to all have vlans 10, 11, 12, 13, 14... until 30, that's is going to take a lot of work to configure, of course, nowadays we can run a script(thank you automation!) but without that option we use VTP, you create the vlans in one switch and they are copied to the rest of the switches in that VTP domain, the domain name, password and VTP versions have to be the same for it to work. VTP has 3 modes, the server which is the big boss the one where we configure the VLANs, then we have the client, which is the one that receives VLANs and copies them into their switch, lastly, we have transparent, this mode allows VTP packets to pass through but doesn't take those VLANs for itself. According to the lab description, SW2 is supposed to be a client but according to the configuration I am seeing it is a Server and the domain name and password aren't configured so let's take this opportunity to configure VTP on the 4 switches starting with SW2.

![](/images/2024/10/image-3.png)

These are the VLANs available in SW2 before VTP, hopefully we have more after.

![](/images/2024/10/image-4.png)

Those are the configurations on SW2, now on to SW1.

![](/images/2024/10/image-5.png)

Done with SW1 which is going to be our main man, the server.

SW3 configurations will be identical to SW2 because they are both clients. SW4-L3 is going to be different, but it's going to be transparent. Here are the configurations.

![](/images/2024/10/image-6.png)

I ran into this while trying to configure SW3-L3 and remembered why I always remove IP domain lookup, I had forgotten so I will start with that and do the same on the other switches.

![](/images/2024/10/image-7.png)

As I stated in my post on routing between VLANs we have to make the links between the switches trunks, I will just show a screenshot of SW1 the rest will be the same.

![](/images/2024/10/image-9.png)

Now time to add the VLANs on SW1 and hopefully they propagate to the rest of the switches.

![](/images/2024/10/image-10.png)
![](/images/2024/10/image-11.png)

Let's see if the other switches got the vlans.

SW2:

![](/images/2024/10/image-12.png)

SW3:

![](/images/2024/10/image-13.png)

SW4-L3:

![](/images/2024/10/image-14.png)

Nothing on this switch because it is in transparent mode.

Now I'll assign the ports to their respective VLANs, I will only show the configurations on SW1.

![](/images/2024/10/image-15.png)

I just realized I forgot to use the nonegotiate command when configuring trunks, this is a command we use to disable DTP negotiation, and what is DTP? Well it is a trunking protocol which I don't use, that's all I am going to say for now. So here is how we disable it on all the switches.

![](/images/2024/10/image-16.png)
![](/images/2024/10/image-17.png)
![](/images/2024/10/image-18.png)

Now we are going to do some VLAN pruning, which us reducing the number of VLANs that can be carried by the trunk interface or rather allowed. You may ask why we do this. To reduce unnecessary traffic, have a layer of security too. So here is how we do that, I will show these configurations for all switches. We will also switch the native VLAN to a VLAN that is not in use.

![](/images/2024/10/image-19.png)

We are already getting alerts because the native VLANs are now mismatched, they have to match on both sides otherwise your trunk link won't work. So now onto SW2:

![](/images/2024/10/image-20.png)

SW2 was already complaining about the native VLAN mismatch too but we have fixed that. SW3:

![](/images/2024/10/image-21.png)

I will run some show commands on SW1 to show what we have been doing.

![](/images/2024/10/image-22.png)

Here we can see our trunk ports, their status, the protocol used, the native VLAN and allowed vlans per port, and so on, very useful commands.

![](/images/2024/10/image-23.png)

This command can give us almost the same details just in summary, it shows us the status of ports, and it is very good for troubleshooting.

There's also the show interface switchport command, I can't show that one because the results are too long.

Now we are going to deal with SW4-L3.

![](/images/2024/10/image-24.png)

First and foremost I am enabling L3 capabilities on this Switch because we want to use some routing with it.

![](/images/2024/10/image-25.png)

Nothing complicated, just gave IP addresses to the VLANs, we are going to use them for routing between the VLANs and use them as our DHCP server.

![](/images/2024/10/image-26.png)

This is for eth0/0 which connects to SW1 and on the topology it's labelled as a route port.

![](/images/2024/10/image-27.png)

A lot of mistakes I made there because I haven't configured DHCP in a while so I was using ? a lot, which is okay.

![](/images/2024/10/image-28.png)

Now let's test if our configurations are okay by requesting IP addresses via DHCP on PC7 and PC8.

![](/images/2024/10/image-29.png)
![](/images/2024/10/image-30.png)

Everything is going well so far, let's try a ping between the 2.

![](/images/2024/10/image-31.png)

Beautiful!

For this post the last configuration I will do is for R7 then the rest of the lab will be done on part 2. Basically, R7 is going to be configured almost identically to SW4-L3, I will use it for ROAS and DHCP.

![](/images/2024/10/image-32.png)

We configured ROAS, and NAT, nothing we haven't done before so no need to go through the configurations.

Now for DHCP.

![](/images/2024/10/image-33.png)

Now to request the DHCP IP addresses from PC1 and 6.

![](/images/2024/10/image-34.png)
![](/images/2024/10/image-35.png)

Now let's do a ping

![](/images/2024/10/image-36.png)

Everything is working well so far.  
For this post I will stop here so that it doesn't become too long then I will finish the rest of the lab in the following post.

Thank you for reading, see you on the next.
