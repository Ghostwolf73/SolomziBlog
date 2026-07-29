---
title: "First Lab, Lab I"
date: 2023-01-11
tags: ["lab"]
summary: "Recently lost my hard drive and when I was starting afresh I decided to use Ubuntu permanently, so this is my first lab on ubuntu and my first lab..."
readTime: "4 min"
---

Recently lost my hard drive and when I was starting afresh I decided to use Ubuntu permanently, so this is my first lab on ubuntu and my first lab generally because I lost all the labs I had on my windows.

Firstly, if you want to install GNS3 on ubuntu you can go to this site https://linuxways.net/ubuntu/how-to-install-gns3-on-ubuntu-20-04/ and follow the guide, I won't talk about my installations or setups.

This first lab is a basic network connectivity network with 6 PCs. I used a kali Linux docker, ubuntu docker, and a simple end host docker, I chose dockers over VCPs because a docker has more options and functions. Below is a picture of the topology.

![](/images/2023/01/screenshot-from-2023-01-11-19-04-34.png)

As shown on the above image this network has 3 VLANs, VLAN 10(Pentesting), VLAN 20(Programming) and VLAN 30(end users). These 3 VLANs are representing a department in an organization and we trying to keep each department seperate from the next for security.

The switch is configured with a basic configuration which I'll write about in detail in the next paragraph.

The first configuration on the switch was adding a password to the enable mode, I used the command (config)# enable secret [password]. I picked enable "secret" over enable "password" because it's more secure and hashes the password.

The next configuration was disabling DNS lookup using the (config)# no IP domain-lookup command, what does this mean? This command helps one work better and more efficiently on a CISCO IOS because if it's not applied and one mistypes a command the switch would think the user is trying to look up a domain name so it will try reaching its dns server and that can be frustrating since you won't be able to use the CLI for a minute or so.

I then configured my line console 0 where I added a password, this is the password needed to go from enable mode to privilege mode, and to configure that I first used the command (config)# line console 0 then in the line configuration mode I used the command (config-line)# password [password] then the command (config-line)# logging synchronous, this command helps one be efficient too it prevents logging output from disturbing the session on the CLI. Then I used the (config-line)# login command, this is the last command on the console 0 it puts the password configured into work, it asks the users to LOGIN.

Next, I configured my VTY lines, these are the lines used to access the switch remotely, and to enter the VTY lines configuration I used the command (config)# line VTY 0 4, this simply means we are configuring VTY lines 0,1,2,3,4. Under the VTY line mode, I configured the password which is going to be used to access the switch using any of these lines with the command (config-line)# password [password] and then changed the transport input to strictly SSH since Telnet is not secure, to do that I used the command (config-line)# transport input ssh. Lastly, I used the command (config-line)# login local, just like the login command I used on the line console 0 this one asks users to log in and enter the password but with the "local" it means a user must also have a username, not just a password.

I then went back to the global config mode where I first configured a username using the command (config)# username [your name] secret [password], these are the credentials that will be used to access the switch remotely. I then configured a domain name because you can't use ssh without one and the command I used was (config)# ip domain-name smile.com then generated keys for ssh using the command (config)# crypto key generate RSA.

I then created the 3 VLANs using the (config)# vlan [vlan number] command and gave the VLANs names with the (config-VLAN)# name [vlan name] command. After that I assigned ports to their respective VLANs, this is done because PCs don't know what VLANs are so a switch is what's responsible for grouping the PCs using the ports they are connected to. To add ports into a VLAN I used the (config)# int range [interface name and number] then under the interface configuration I used the command (config-if-range)# switchport access VLAN [vlan number]. This put the PCs to their respective VLANs which means they are in simple terms in different networks.

I then configured port security on the ports to secure the network the commands used were also used under the interface range, and I will make a post in the future on port security in detail.

I then gave the PC's IP addresses, subnetted 192.168.0.0/24 into 3 networks with VLAN 10 using .1.0, VLAN 20 using .2.0, VLAN 30 using .3.0 and then tested my configurations by using the ping command from each pc checking if a host can reach a PC in their VLAN and those outside it's VLAN.

I then configured the router on a stick on the router interface to enable inter-VLAN routing, I will also make a post on types of inter VLAN routing by the end of the work.

Thanks for reading, I will try to cut down on the length and try to explain things better.
