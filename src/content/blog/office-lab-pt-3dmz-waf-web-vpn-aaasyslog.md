---
title: "Office Lab Pt. 3(DMZ, WAF, Web VPN, AAA,Syslog...)"
date: 2025-01-27
tags: ["routing"]
summary: "This will end this series, the conclusion to our office lab. We are going to configure DMZ, WAF, Web VPN, AAA, and Syslog. I will of course explain what..."
readTime: "6 min"
---

This will end this series, the conclusion to our office lab. We are going to configure DMZ, WAF, Web VPN, AAA, and Syslog. I will of course explain what these are and what they do along the way whilst giving details on the configurations in full, so let's get to it.

![](/images/2025/01/image-35.png)

We'll start with DMZ and we'll be working with this part of the network, of course, we'll use the mgmt PC to do our configurations. Let's start from the beginning, what is a DMZ? Why do need it?

DMZ stands for Demilitarized Zone this is a buffer zone that helps protect an organization's LAN from the internet. So let's say our organization has a Web server(like this one) of course everyone should be able to access that web server through the internet, but the web server is in our private LAN which means if a bad actor accesses that web server and exploits it they have the potential to access our LAN and hence compromise our whole network. So what DMZ does is build a wall around that server making it so that the outside world can interact with the server but cannot interact with the LAN unless they are permitted to.

So for this lab, we will configure DMZ for our webserver then try to access it using the external PC which is acting like a random PC, and see how it works. Let's get to it!

First we go to the interface that connects to our web server and edit it, in this case it's port4.

![](/images/2025/01/image-36.png)

These are the configurations on the port, nothing special just give it a name, then on the role select DMZ and then we give it a static IP address in the 192.168.60.0/24 network. Notice how we have no Administrative Access allowed because remember DMZ we are trying to make this place as secure as we can and if we were to allow admin access that would open doors for loopholes.

Next, we map that interface with our web server and we do this by going to Policy & Objects, addresses then create new.

![](/images/2025/01/image-37.png)

So on the IP/Netmask, we put the IP address of the webserver. Next, we create a virtual IP, this is also under Policy & Objects.

![](/images/2025/01/image-38.png)

For the external IP, we used our WAN interface then we mapped it to our web server. On the port forwarding you can use specific ports, here I used 80, I should have gone with 443 which is https but it's okay. Now last but not least we need the policy of course and here is what it looks like:

![](/images/2025/01/image-39.png)

A normal policy as usual with just a difference on the destination where we put the "web server" which is that virtual IP we created then we disable NAT because we have already mapped an address so there's no need for NAT. Now let's try accessing the web server and see.

![](/images/2025/01/image-40.png)

We can access the Web Server, lets just login and see whats going on.

![](/images/2025/01/image-41.png)

Nice! Now that we are done with DMZ, time to take care of WAF.

First and foremost what is WAF? It stands for Web Application Firewall and as the name states this is a firewall for Web Apps, it helps us protect web applications from layer 7 (application layer) attacks such as SQL injection and cross-site scripting. The configs for this are not complicated so let's get to it.

![](/images/2025/01/image-42.png)

Firstly we go to the system tab, then feature visibility, and then toggle Web Application Firewall, this may be different on your firewall because I am using quite an old version here.

![](/images/2025/01/image-43.png)

Next, we go to security profiles, then Web Application Firewall, there's a default one there that you can edit according to your liking, requirements, and so on, but here is mine.

![](/images/2025/01/image-44.png)

Now let's test this, we'll use our WAF on the Web Server policy then emulate an attack and see what happens.

First we go to the policy like so:

![](/images/2025/01/image-45.png)

Then on the inspection mode we switch to proxy based.

![](/images/2025/01/image-46.png)

Now we toggle the WAF and select the default we customized earlier. Now let's simulate an attack. We'll use that external PC, we'll run a simple SQL injection.

![](/images/2025/01/image-47.png)

That is our SQL injection, nothing special, now lets see if our WAF works.

![](/images/2025/01/image-48.png)

And it was blocked, easy right? lets get to the next task.

Now we'll focus on Remote Authentication, AAA(Radius) Just to be clear, AAA stands for Authentication, Authorization, and Accounting. Authentication is verifying the identity of a user, Authorization is what the user can and can not do, and Accounting is tracking who did this and who did that. Now that we have that out of the way let us configure a Radius Server.

![](/images/2025/01/image-49.png)

Here is our Radius Server on the topology, now lets get to the CLI!

![](/images/2025/01/image-50.png)

The first command for us to go into the config file and add just a few lines like so:

![](/images/2025/01/image-51.png)

We restart:

![](/images/2025/01/image-52.png)

Now let's run it!

![](/images/2025/01/image-53.png)

We use this command, but you'll get this error:

![](/images/2025/01/image-54.png)

Now lets fix it.

![](/images/2025/01/image-55.png)

Run this command to get the process ID and then we kill it.

![](/images/2025/01/image-56.png)

Now lets run it again!

![](/images/2025/01/image-57.png)

And we are up!

Now time to configure the Firewall

![](/images/2025/01/image-58.png)

We go to user and Authentication, RADIUS Servers then create new.

![](/images/2025/01/image-59.png)

And these are our configs, now lets test the connectivity:

![](/images/2025/01/image-60.png)

Successful, now I want to show you what the server does when we run these tests:

![](/images/2025/01/image-62.png)

Thats the server side, we can now create multiple users, and manage them but I wont be doing that on this lab.

Lastly we will configure Syslog and Netflow.

![](/images/2025/01/image-63.png)

On the log settings we do this, you can do this using the CLI too but I won't do that here.

Now lets see if we can access ntop the MGMT PC:

![](/images/2025/01/image-64.png)

We can! let's log in and see:

![](/images/2025/01/image-65.png)

It's logging. Now for netflow, we will use the CLI for a change.

![](/images/2025/01/image-66.png)

And thats it, now let's see if it worked:

![](/images/2025/01/image-67.png)
![](/images/2025/01/image-68.png)

And we are in. What we just did here is a syslog configuration that sends our Fortinet logs to the NTOP server where they can be stored for future analysis and reference. The second configuration was for Netwflow. This sends detailed traffic flow data to the NetFlow collector for real-time monitoring and traffic pattern analysis.

With the above configured we have very strong logging and monitoring on our network, remember this is a sim of an office lab and you need to log and monitor an office that way you can detect issues and analyze traffic in general.

Last but not least, we'll add the cherry on top by configuring a one arm sniffer, which is shown on the topology but here it is again:

![](/images/2025/01/image-69.png)

And here is the configs:

![](/images/2025/01/image-70.png)

And just like that, we are done. I wanted to add a section on backing up, but maybe next time. This has been a long lab, and it kept on crashing and deleting my configs. I almost quit along the way, but I am finally done and have documented everything here. Thank you for reading and keeping up. If you have any questions, contact me.

Thank you, catch you on the next!
