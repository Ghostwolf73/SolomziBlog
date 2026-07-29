---
title: "VLANs with Ansible"
date: 2024-11-07
tags: ["switching", "automation"]
summary: "We have configured VLANs before, a lot of times, but today, we'll be configuring VLANs automatically using Ansible. For this lab, I didn't build a..."
readTime: "3 min"
---

We have configured VLANs before, a lot of times, but today, we'll be configuring VLANs automatically using Ansible. For this lab, I didn't build a complicated lab; I just used the lab we used for routing with Ansible. I used one switch because I had to test my script and adjust it multiple times, so it wasn't ideal to start with dozens of switches. I hope to do that in the upcoming days.

![](/images/2024/11/image.png)

Here is the topology; let's get to it. The first thing I did was a base configuration on the switch, including SSH. I also gave VLAN1 an IP address, which is what we are going to use to connect remotely to the device.

Now we go to the hosts file we used for routers and add our switch, like so:

![](/images/2024/11/image-1.png)

Added the variables too:

![](/images/2024/11/image-2.png)

Next is the script itself. I have two versions of this script. The first one configures the VLANs one by one and is the one shown in the Ansible documentation. The other one was a little touch by me, where I had to use loops instead of going VLAN by VLAN.

![](/images/2024/11/screenshot-2024-11-07-170111.png)

The only part I'd like to explain when it comes to the script is the state: merged.

So when using Ansible to configure VLANs we have different states, here we used "merged" and this simply means we are merging whatever configs the script is passing with whatever configs are on the switch.

Another state we have is "replaced" as the name implies we replace the configs we find on the switch with the ones carried by the script so if the switch had VLAN 13,14, 15 it will replace them with VLAN 10, 20, 30 but the default vlans will stay intact.

The next one is "overridden" to be honest I don't understand the difference between this one and replaced because it also overwrites the configs with what's in the playbook.

Last but not least we have the "deleted" which we use to remove specified configs, I have a playbook that uses this state which I'll show later on.

So let's see if our script works.

![](/images/2024/11/image-5.png)

This is our VLAN config before the script.

![](/images/2024/11/image-3.png)

And for the results:

![](/images/2024/11/image-4.png)

Now let's check the VLANs again.

![](/images/2024/11/image-6.png)

First we get that notification which means something happened.

![](/images/2024/11/image-7.png)

And just like that, we have added 3 VLANs. We are not done yet, as I said I optimized this script further but to get to that let's first delete the VLANs we are not going to delete them manually no we are ansible users now we use automation even for small tasks, and this we use the "deleted" state and here is how our playbook would look like.

![](/images/2024/11/image-8.png)

This playbook will delete all VLANs, excluding the default, let's run it.

![](/images/2024/11/image-9.png)
![](/images/2024/11/image-10.png)

and again the switch reports that something happened here:

![](/images/2024/11/image-11.png)

Now you may wonder what if we want to delete a specific VLAN? well, I also adjusted the playbook for that:

![](/images/2024/11/image-12.png)

Simple right? Now let's look at that optimized playbook.

![](/images/2024/11/image-13.png)

Here is how the script would look if we use loops(which is more efficient) than typing each VLAN out, pretty neat right? Let's run it too.

![](/images/2024/11/image-14.png)
![](/images/2024/11/image-15.png)

As you can see it runs in loops, starts with item 10, goes to 20 then 30. This is far better and shorter than the previous playbook. Now just to confirm let's check if the VLANs have been configured.

![](/images/2024/11/image-16.png)

And everything looks good.

I want to put it out there I am no Ansible expert, my playbooks are very basic and may be bad for an expert but I am still learning and will try to improve with time.

If you are interested in the iterations of these playbooks, see the stages I took while writing them you can check out my GitHub where I have comments for every commit and iteration.

This was a pretty short but straightforward post, hope it was informative.

Catch you on the next one!
