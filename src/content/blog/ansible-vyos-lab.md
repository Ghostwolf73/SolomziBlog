---
title: "Ansible Vyos Lab"
date: 2024-10-28
tags: ["automation", "homelab"]
summary: "Today, I am diving into network automation, specifically Ansible. I built a simple lab with an Ansible docker, a Cisco switch, and 3 Vyos routers..."
readTime: "5 min"
---

Today, I am diving into network automation, specifically Ansible. I built a simple lab with an Ansible docker, a Cisco switch, and 3 Vyos routers connected to the switch, which connects to the Internet.

![](/images/2024/10/image-62.png)

So to clear things up, I used Vyos routers instead of Cisco ones(which I usually use) because the cisco images I have are outdated and I was struggling to work with them, firstly I was struggling with using SSH from the Ansible docker then after I fixed that my playbooks weren't working, something about python not being installed, maybe I could've found the solution online as usual but I found out about Vyos which is open source and I can get the newest images for free plus an opportunity to work with a new software, new os, new environment, breaking out of that cisco ecosystem I am always in I think is quite beneficial because lately I have been trying to branch out and work with other vendors, I don't want to be that guy who can only work with cisco instead I want to work with multiple vendors I think that would make me a better technician.

So, let's get to it. I used a Linux image for my Ansible docker. I won't get into the details of that the process is long, and I am lazy to write. Now, onto my Ansible environment. When we switch on the docker and go to its cli, we start off here.

![](/images/2024/10/image-63.png)

So what I did was connect this docker to the internet give it an IP address via DHCP and then installed everything needed for Ansible to run ie the packages after that I disconnected it from the internet, gave it a static address in line with the network we are going to work with which is **192.168.123.0/24** and for the docker I assigned .10 as it's IP address.

Next we go into the ansible folder, to work with ansible you need to be in the directory where it was installed

![](/images/2024/10/image-64.png)

Now what I did next was create a "hosts" file which is what will store the details for the hosts Ansible is going to work with and here is how I did that.

![](/images/2024/10/image-65.png)
![](/images/2024/10/image-66.png)

So this is quite simple the [routers] is a name I chose to give to my hosts, you can have multiple for example another one can be [switches] another one [firewalls], you get the idea. The next one is where we take the "routers" and define their variables, we tell Ansible what username to use for ssh, what password, os, and so on.

Next I added the ansible config file, which is the file that stores the configurations, what i did was create the file using nano like so:

![](/images/2024/10/image-67.png)

And then went to google, looked for an ansible config file example, found one on Github, copied it into my ansible.cfg, the file itself is long and most of it is commented out, let me show an example.

![](/images/2024/10/image-68.png)

All I did was remove the comment tag on the inventory which is to tell Ansible that for an inventory go use a file named hosts found in etc/ansible.

Now we pause here for a moment and go to our routers, remember it's Vyos, not Cisco ios so things are going to be quite different, I was struggling with the commands myself but they aren't that difficult I am just not used to them. So on the routers I configured the hostname, IP address, and SSH, here are the commands down below.

I will show commands on R1 only.

![](/images/2024/10/image-69.png)

So we are welcomed to Vyos blah blah blah and the default credentials are vyos vyos.

![](/images/2024/10/image-70.png)

Then we are on the operational mode which is like the Cisco user exec and privileged mode mixed together, so normally we have to move to config mode to do configurations and on Cisco, we use "conf t" On Vyos we say:

![](/images/2024/10/image-71.png)

Now we are in the configuration mode, and here are my SSH configs, I will screenshot my mistakes too because trust me I was struggling.

![](/images/2024/10/image-72.png)

Quite simple compared to Cisco, but it can be complicated if you want to customize your configs but that's not what I am here for, next is the interface.

![](/images/2024/10/image-73.png)

I even gave the interface a description to look cool.

Then next was the router hostname.

![](/images/2024/10/image-74.png)

Then I created the user "solo" which I am going to use for my SSH and so on, I mean who wants to log in as "vyos" here I used a lot of the "?" because I was clueless but hey that's how we learn.

![](/images/2024/10/image-75.png)

Next we save our configurations, Vyso saves them in the config mode.

![](/images/2024/10/image-76.png)

First you commit your changes then you save them, similar to Git which is nice to be honest.

Now I had to run some pings to check if my docker can reach the routers.

![](/images/2024/10/image-77.png)
![](/images/2024/10/image-78.png)

Next I tried to SSH into the 3 routers traditionally and I got this error:

![](/images/2024/10/image-79.png)

As usual had to use my Google skills to find answers, I haven't figured out why this happens but I have the solution and here it is below.

![](/images/2024/10/image-80.png)

We remove the known hosts file then boom we are in, check this out.

![](/images/2024/10/image-81.png)

So we can remotely access the routers, now time to check if Ansible works. Firstly I ran a ping using ansible to check if everything was in order and it was beautiful.

![](/images/2024/10/image-82.png)

Those green lines mean we did well!

Now onto the best part, creating a playbook and running it. Well, what is a playbook? In simple terms, I'd say it's a yaml script that we use to give the router instructions on what to configure. What I did was go to Ansible Docs and take their first script, copy that script, create a repo for it on my GitHub put it on my VSCode to keep it clean before copying it to my docker, and then commit and push it to my GitHub, here is how the script looks like:

![](/images/2024/10/image-83.png)

It's a simple script, that goes into our devices and gets the device hostname and OS version, I saved the script as "Playbook.yml" .yml is the extension we use for YAML.

Now to run the script.

![](/images/2024/10/image-84.png)

And here are the results...

![](/images/2024/10/image-85.png)

Beautiful! This means everything is working well, this may be a simple script but it's okay we are going to build from this and start configuring complicated stuff and more devices.

I hope my next post will be up soon because I am excited about these automation labs, catch you next time, thank you for reading!
