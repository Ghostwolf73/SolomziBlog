---
title: "DHCP Server on a Cisco router"
date: 2023-01-23
tags: ["routing", "ccna"]
summary: "In my lab today I took 2 routers and configured them as DHCP servers, this will be a very short blog post because there is not much to explain just a list..."
readTime: "2 min"
---

![](/images/2023/01/screenshot-from-2023-01-23-16-34-44.png)

In my lab today I took 2 routers and configured them as DHCP servers, this will be a very short blog post because there is not much to explain just a list of commands that don't need much writing on.

If you look at the above I have 2 DHCP servers one for VLAN 10 and one for VLAN 20. The first thing I did was make sure I connected each server(router) to the right port since these ports are under different VLANs if you put DHCP 1 on a port assigned to VLAN 20 Comp1 won't be able to get an IP address from it because from Comp1 pov that server wouldn't exist.

The second most important thing which made me spend some time scratching my head after my configurations cause I had not done it is making sure the interface connecting to the switch is up and has an IP address. Now here are the commands for the configuration:

![](/images/2023/01/screenshot-from-2023-01-23-15-58-05.png)

Firstly we exclude addresses with the first command on the screenshot, this just means when offering IP addresses to clients don't give 10.1 to 10.9 maybe because we have reserved these for static configuration on a switch, gateway, server, and so on. We then enter the DHCP pool using the IP DHCP pool and the name of the pool, you can name the pool whatever you want.

Once in the DHCP config, there are a lot of options but for now, on my level, I know half of them. Firstly you define the network with the network command, this is what determines the range of IP addresses based on the subnet mask, here I used /24 and now that I think about it I should've used a smaller subnet.

Next, we tell the server the addresses of our DNS server and default router and gateway. We then give a domain name and to be honest I don't know why we do it and what it does, I will make sure I read about it. That's it those are the configurations, now to check on the client side if it got the IP here I am using Ubuntu dockers so I ran the ifconfig command and saw that the PC had obtained an IP address moreover when you switch a docker-machine open its CLI it shows you the process of trying to obtain an IP address like so:

![](/images/2023/01/screenshot-from-2023-01-23-16-29-02-1.png)

On the router, we can then check the DHCP addresses that have been handed out and who they have been handed out to:

![](/images/2023/01/screenshot-from-2023-01-23-17-27-33.png)

That's all there it is for now, thank you for reading and I will add the links below.

https://study-ccna.com/configure-cisco-router-as-dhcp-server/

https://www.cisco.com/en/US/docs/ios/12\_4t/ip\_addr/configuration/guide/htdhcpsv.html
