---
title: "DHCP and Routing with Fortinet Firewall"
date: 2024-12-19
tags: ["routing"]
summary: "Today, we are diving into Fortinet, specifically the Fortinet firewall. The proper way to start this post is by defining a firewall. So what is a..."
readTime: "3 min"
---

Today, we are diving into Fortinet, specifically the Fortinet firewall. The proper way to start this post is by defining a firewall.

So what is a firewall? A firewall is basically a security guard for our network, it is a network device that we use to monitor what goes into and out of our network. Just like a security guard a firewall is responsible for the access control of the network, it decides what traffic can go in or out.

What I have is a lab with 3 Linux dockers, a network switch, a Fortinet Firewall that acts as our router, default gateway, and DHCP server too.

![](/images/2024/12/image.png)

Firstly we are going to run a basic configuration on the firewall, nothing fancy.

![](/images/2024/12/screenshot-2024-12-11-144242.png)

The only command I think I should explain is the timezone one and I used this command to keep my devices synced because in the future I plan to add NTP and Syslog servers and for logs, you really need the proper date and time configured. So what is the "34" well that is my timezone and to find yours or the code for yours rather you go to [this](https://help.fortinet.com/fmgr/cli/5-6-2/Document/1000_system/global+.htm) site.

Next, I configured the interfaces.

![](/images/2024/12/screenshot-2024-12-11-144625.png)

Port 1 and 2 use static addresses with one under the 192.168.1.0/24 network and the other in the 192.168.50.0/24 network. Port 4 on the other hand as the topology shows is what we use to get to the internet and in this case, we say it is connected to the ISP and it gets its IP address dynamically. Now let's check if we can get to the internet by pinging Google public DNS.

![](/images/2024/12/screenshot-2024-12-11-145000.png)

Okay,all set!

Now as an extra here are some troubleshooting commands you can use on Fortinet.

![](/images/2024/12/screenshot-2024-12-11-145006.png)
![](/images/2024/12/screenshot-2024-12-11-145013.png)

Next, we log into our Firewall using PC1, we are doing this to have a feel of the GUI that's why even the PC I will be using the GUI instead of the CLI.

![](/images/2024/12/image-1.png)

Now we are going to start using the firewall for what it is meant for, we are going to configure a policy, a policy to allow the other two subnets to access the internet because right now PC1 cannot access the internet.

![](/images/2024/12/screenshot-2024-12-11-151729-1.png)

Now lets connect this bad boy to the net:

![](/images/2024/12/screenshot-2024-12-11-152130.png)

These are the interfaces we have, now we go to the Firewall policy tab.

![](/images/2024/12/screenshot-2024-12-11-150858.png)

Already has an implicit deny, similar to an ACL, we click create new.

![](/images/2024/12/screenshot-2024-12-11-150918.png)

We configure the fields like so:

![](/images/2024/12/screenshot-2024-12-11-151148.png)

for the source we create new address:

![](/images/2024/12/screenshot-2024-12-11-151243.png)

And after that new address, our section will look like this:

![](/images/2024/12/screenshot-2024-12-11-151404.png)

Now if we go back to the Policy tab this is how it's going to look like:

![](/images/2024/12/screenshot-2024-12-11-151441.png)

There we go, we have our new policy configured.

![](/images/2024/12/screenshot-2024-12-11-151815.png)

Beautiful! We have internet access.

Now PCs 2 and 3 don't have static IP addresses, here we are going to make sure the Fortinet DHCP server feature shines by using the firewall as the DHCP server and have it hand out IP addresses.

We go under the respective interface and enable the DHCP option:

![](/images/2024/12/screenshot-2024-12-11-152221.png)

Now let's go to PC2 and request an IP address:

![](/images/2024/12/screenshot-2024-12-11-152658.png)

And we got an IP! Let's try accessing the internet:

![](/images/2024/12/screenshot-2024-12-11-152814.png)

Perfect!

and for PC 3:

![](/images/2024/12/screenshot-2024-12-11-153001.png)
![](/images/2024/12/screenshot-2024-12-11-153220.png)

We are set too!

Now we have full connectivity and we have a feel of the GUI, maybe we can use this for other labs, maybe a lab with Wireshark to inspect the behind-the-scenes but that's for the future me.

I hope this was a good and educational read, catch you on the next one!
