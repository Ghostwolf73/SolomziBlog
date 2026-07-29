---
title: "OSPF, BGP, MPLS, VRF with Ansible"
date: 2024-10-31
tags: ["automation", "ccnp"]
summary: "First and foremost let me whine, took a bit of time to work on this because my VMWare was giving me problems, after my last I tried doing some packet..."
readTime: "4 min"
---

First and foremost let me whine, took a bit of time to work on this because my VMWare was giving me problems, after my last I tried doing some packet inspection with Wireshark and it had an update, I updated and rebooted my PC but after that when I tried opening up my server on VMWare it was corrupted, I thought I was cooked so I wanted to build the server from scratch but I looked around before doing that and ended up repairing it.

So enough of that useless info dump, Okay more automation, let's get to it!

![](/images/2024/10/image-86.png)

This is the topology I worked with, looks a bit overwhelming but it's not that much, the plan is to connect all these routers with OSPF, BGP, and MPLS so MP-BGP and then we'll add some VRFs, this will all be done using Ansible.

So a bit of a summary on the lab, the lab has IP addresses configured, some base configurations, and SSH because we need that to remotely access the routers. The rest will be done on the Ansible docker, we won't touch the routers until the end when we have to test the connections, so let's go.

![](/images/2024/10/screenshot-2024-10-31-121319.png)

Firstly we deal with the "hosts" file under the ansible directory, nothing much, it's not different from what we did in the previous lab, the difference is now we have 3 groups, core, PE, and customer.

Secondly we create 2 folders for our variables, group\_vars and host\_vars.

![](/images/2024/10/screenshot-2024-10-31-121424.png)

Then, in the group\_vars directory, we create three YAML files: one for our core routers, one for PE routers, and one for the customer routers. Then in the host\_vars we create YAML files for PO1,2,3, PEO1, and 2.

![](/images/2024/10/screenshot-2024-10-31-121644.png)

Now onto the content of those YAML files, my screenshots will come from VSCode which is what I use to write these playbooks because of the interface and extensions plus I have been trying to revive my GitHub so everything I write now also goes there.

Core.yml

![](/images/2024/10/image-87.png)

PE.yml

![](/images/2024/10/image-88.png)

Now the customer.yml has a lot of in so brace yourself.

![](/images/2024/10/image-89.png)

Here is where our OSPF configs go up, you can go through the script and check, if you have questions you can contact me.

Next we go into the host\_var directory to configure the YAML files there.

PO1.yml:

![](/images/2024/10/image-90.png)

PO2.yml:

![](/images/2024/10/image-92.png)

PO3.yml

![](/images/2024/10/image-93.png)

Here we are configuring the core routers, we configure the interfaces and OSPF processes, nothing fancy.

POE1.yml

![](/images/2024/10/image-94.png)
![](/images/2024/10/image-95.png)

POE2.yml:

![](/images/2024/10/image-96.png)
![](/images/2024/10/image-97.png)

These last two scripts configure OSPF and BGP, we then go on to add VRFs for the customer connections which is going to allow the router to route traffic appropriately for different clients within distinct VRF instances.

Now we create 2 playbooks one for core routers and the other for customer routers, these are what is going to make everything run.

![](/images/2024/10/image-98.png)
![](/images/2024/10/screenshot-2024-10-31-144351.png)

Now here is where I hit a deadlock and for a minute I wished I had continued with Vyos instead of being stubborn and challenging Cisco, I looked around and learned why I got this error, the answer is simple really, Ansible needs to be told the enable password, needs to be told to go to the global config to run these configs so I went back to my groups\_var and added just a few lines on those files.

![](/images/2024/10/image-99.png)
![](/images/2024/10/image-100.png)
![](/images/2024/10/image-101.png)

So we just added those last 3 lines, now let's run the script again.

![](/images/2024/10/screenshot-2024-10-31-144115.png)
![](/images/2024/10/screenshot-2024-10-31-145254.png)

Finally we create and run the last playbook which is going to take care of the VRFs, I called it services-running.yml

![](/images/2024/10/image-102.png)

Note: these scripts aren't special, I am not some coding genius no you can find them online on the Ansible Documentation and adjust them for your specific network, no need to write scripts that are already there from scratch.

Now let us run the script.

![](/images/2024/10/screenshot-2024-10-31-150037.png)

And boom! green means success, last but not least I just went to one router and ran pings to all networks to check for connecticity.

![](/images/2024/10/screenshot-2024-10-31-151632.png)

And with that the lab was a success, it was not as challenging as I thought it would be, I should do more of these Ansible labs and practice more. I will also inspect the packets with WireShark especially the interfaces configured with VRFs, I want to check how everything goes behind the scenes, maybe if I understand it enough I'll write about it.

**Quick Edit** I was about to switch off all my routers and close VMWare then I saw this on the terminal...

![](/images/2024/10/image-103.png)

I love how cisco reports who made the changes to the router and how they did it, this is good for the logs and accountability.

Thank you for reading, hope you took away something.

Catch you on the next!
