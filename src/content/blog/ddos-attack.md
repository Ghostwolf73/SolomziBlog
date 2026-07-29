---
title: "DDOS attack"
date: 2024-11-18
tags: ["security"]
summary: "Okay today we'll be diving into some network security. Let me set the lab up and give the overview. We have our standard ugly and poorly designed topology..."
readTime: "5 min"
---

Okay today we'll be diving into some network security. Let me set the lab up and give the overview.

![](/images/2024/11/image-17.png)

We have our standard ugly and poorly designed topology we use for tests. What we have here is three Ansible Dockers set up as "botnets." I will explain that later. We also have an Ansible docker, the one we used in the previous lab, an Apache server docker, and a Ubuntu VM. All these devices are in the same network we used in the previous lab, the 192.168.123.0/24 network. Let's go through all the devices and their roles in the lab real quick.

DDOS, let's first define that, our title, DDOS stands for Distributed Denial Of Service, this is an attack where hackers flood a server with so much traffic that it gets overloaded and users can not access it anymore. So we have a DOS attack which is done from one machine, DDOS on the other hand is done using multiple machines from different locations, usually something called botnets, where hackers take over other people's PC's and use them to send that attack. Well, here you can argue that in this lab this is not a botnet but yeah I am just simulating the real world of course.

We then have an Apache Server Docker. What is an Apache server, one may ask? This is an open server(we love those) that helps us deliver content using HTTP. What do we have on this Apache server? Nothing, really, just an HTML file with my name and a welcome banner. To check this, we use the Ubuntu desktop, go to its browser, and type the IP address of the Apache server.

![](/images/2024/11/image-18.png)

So we are going to pretend like this is a server for an organization, and then with the Ansible Docker, we are going to run continuous pings to the server. This is really important because we are going to see how the attack affects the traffic to the server.

![](/images/2024/11/image-19.png)

This is how the port connected to the server looks currently, no traffic just CDP, so let us run a ping to the server from the Ansible docker and see.

![](/images/2024/11/image-20.png)

Now lets capture the packets.

![](/images/2024/11/screenshot-2024-11-18-151342.png)

Nothing special just exactly what you'd expect from a ping, ICMP packets, ARP requests which means everything is working well.

So now time for the attack itself. For the DDOS I wrote a simple, pretty bad script with Python that is going to send HTTP GET requests that have spoofed IP in their headers, these are going to be persistent causing the server to start having delays. I won't show the script itself here but you can find it on my GitHub link in my About section. This is nothing special, I didn't invent something new or anything, no it's just a simple script and I am sure I could've used some scripts online too like Slowloris but I wanted to write mine from scratch so that I keep myself sharp when it comes to Python and programming in general.

****I HAVE TO PUT THIS OUT THERE AS A DISCLAIMER, THIS IS FOR EDUCATIONAL PURPOSES. I AM USING THIS TO FURTHER DEVELOP MY SKILLS AS A NETWORK AND SECURITY ENGINEER, YOU MUST NOT DO THIS ON OTHER PEOPLE'S MACHINES WITHOUT PERMISSION YOU CAN GET ARRESTED FOR IT.****

So we have the python script in all of the botnet machines like so:

![](/images/2024/11/image-22.png)

That testDDOS.py is our script so let's run it and see.

![](/images/2024/11/image-23.png)

We use the Python3 to run it of course.

![](/images/2024/11/image-24.png)
![](/images/2024/11/image-25.png)

Our packet capture is going crazy like this, let us check our pings.

![](/images/2024/11/image-26.png)

Our pings have gone from 1 ms to 6 thousand ms and some 8 thousand.

On the ubuntu machine, the web server is taking time to load, which means our attack is working.

So let's explain what we are seeing with our packet capture, firstly it's showing us that there is an SYN flood, which means our scripts are creating many TCP connections, the tricky part is the script makes it so that we send multiple packets but don't complete the TCP handshake which leads the server to allocate resources for each incomplete connection.

We are also getting TCP retransmissions, the server is unable to handle this SYN flood, there's too much sent at a time and the server cannot respond in time leading to packets being delayed, dropped and some retries taking place.

We also have a lot of RST(reset) packets that terminate the connection abruptly.

And then we have HTTP GET requests which the server is also struggling to respond to because it is being overloaded.

Here and there we see the ICMP packets from the Ansible docker, which means they are going through after that 6k ms delay and so on.

So our attack was a success, of course, this is almost nothing, you'd need a better script, and better resources to completely shut down a target but again this is just a way for me to learn and share knowledge.

What's next? Why did I do this? Well I wanted to see what a DDOS attack looks like on a packet capture and most importantly I wanted to implement a solution for it, which is what I will do in the next post, we'll configure a firewall to protect our server from such attacks and then we'll attack again, see how it gets blocked, inspect the packets and see behind what's behind the curtain.

I hope this was a fun read and you learned something, if you have questions don't hesitate to contact me, by email, LinkedIn, or WhatsApp.

Catch you on the next one!
