---
title: "OSPF, EIGRP and BGP"
date: 2023-05-08
tags: ["routing"]
summary: "I am gonna use this part of my topology to walk through the configurations of these 3 routing protocols, OSPF, EIGRP, and BGP. We will start with R1 and..."
readTime: "7 min"
---

![](/images/2023/05/2023-05-08-15_35_14-pnetlab-_-topology.png)

I am gonna use this part of my topology to walk through the configurations of these 3 routing protocols, OSPF, EIGRP, and BGP.  
We will start with R1 and R2 which are my gateway routers, configured with HSRP. The two routers are configured with OSPF and share routes with R3's Fa0/0 and Fa1/0 interfaces.  
So let's get to the configurations, firstly on R1 I have already done the configurations, all I have to do is run the show run command and then explain them line by line.

![](/images/2023/05/2023-05-02-16_18_46-r1.png)

We have two interfaces on which we want to configure OSPF, interface Fa1/0 and Fa2/0, I added descriptions to these interfaces for better understanding for anyone who reads this and me in the future when I want to troubleshoot. The interfaces are configured with IP addresses from their respective subnets then the next command which is the most important for this is what we need for OSPF in this case and that is IP OSPF, how we are telling the interface we are going to be using OSPF as our protocol then we go on to add the area 1 which means this interface is under an OSPF domain called area 1, routers exchange routing information with routers on their area, if I were to put Fa2/0 on Area 0 or another number they wouldn't exchange routes unless I tell them to. With this the configuration is done, the interfaces are under an OSPF area and they will keep on sending OSPF hello messages, if they find replies(which are routers in the same area) they form what are known as OSPF adjacencies which I could simply call relationship. After an adjacency is formed they can start exchanging routes.

![](/images/2023/05/2023-05-02-16_28_40-r1.png)

Now here comes another way to configure OSPF, we do this under the global configuration. In the first line "router OSPF 1" we tell the router we gonna be using this routing protocol which is OSPF in this case then we give the OSPF ID which is 1 here, remember even above we put the interfaces under OSPF 1, so these two under the same OSPF ID. We then configure the router-id this is the number that OSPF will use when advertising the router to other routers, it is for identification in an OSPF network, I gave it 1.1.1.1 because we are on router 1. We can go without configuring the router ID and the router will automatically choose the highest configured IP address on a loopback or active interface as the ID. Next is the network command, here is where we tell OSPF which networks to advertise, advertise I mean to share with its OSPF neighbors. The main reason we didn't have the network command when we configured OSPF directly on the interface is because when configured on an interface it then advertises that interface's network. Here we are telling OSPF "we have a network called 10.0.10.0/24 please advertise it in area 1" Then one may ask why does that subnet mask look weird? well, that's because OSPF doesn't use subnet masks but wildcard masks, here is a link to what a wildcard mask is and how it works https://study-ccna.com/wildcard-masks/ After that we have area 1 which I have explained, and our commands are done. As you can see I advertised 2 routes, you can add as much as you can, these 2 routes I am advertising are on the side of the network I cut off on the diagram because we are not focusing on it.

Below I will attach screenshots of configurations on R2 and R2 then I will switch on the interfaces, do a packet capture and show OSPF learning about its neighbors.

R2 configs:

![](/images/2023/05/2023-05-02-16_47_55-r2.png)
![](/images/2023/05/2023-05-02-16_48_17-r2.png)

Note: though I used the same OSPF numbers(1) they don't need to match, only areas, neighbors subnets should match for them to form an adjacency, router ID's should NOT match, they should be unique.

R3 configs:

![](/images/2023/05/2023-05-02-16_52_22-r3.png)

The only new thing here is the last line, "default-information originate always" All I can say now is that line is to tell the router to share its default gateway with routers in OSPF area 1. I will explain later why that is needed and why I did it.

![](/images/2023/05/2023-05-08-00_57_26-pnetlab-_-topology.png)

Now onto **EIGRP**, we will be focusing on R3, Server R1, and Server R2. This was my first time configuring EIGRP and it was exciting doing it and seeing those neighborships form. If you look well the lines that connect the router are yellowish which means I used a serial link, I am trying to say these sites are far from each other so I can't use ethernet cables, just tryna be practical. We are gonna start with Server R1 and these are the commands on it...

![](/images/2023/05/2023-05-08-00_59_03-server-r1.png)

Very similar to what we did with OSPF, we first define the routing protocol and its ID, here the ID is 1 then we enter the routes we want to advertise under that ID in this case its the 10.0.1.0/24, 192.168.12.0/30 and 192.168.31.0/30 networks. On server R2 we have similar configs and here is a screenshot…

![](/images/2023/05/2023-05-08-01_01_51-server-r2.png)

I also used ID 1 for Server R2 to avoid complications. Now for the configs on R3, which is the center of our network, it's where every site meets, it's our gateway, I call it the "main router"

![](/images/2023/05/2023-05-08-01_05_07-r3.png)

Now if we check the routing table of server R1 we'll see that it learns of the 192.168.32.0/30 route via EIGRP, routes learned via EIGRP have a D symbol, on Server R2 we will learn that it now knows about the 192.168.31.0/30 router via EIGRP too and R3 learns about the 192.168.12.0/30 router. I then configured Server R1 and Server R2 to use R3 as their default gateway. Below I will show screenshots of the routing tables of Server R1 and R2, I won't show R3 yet because it has routes I haven't discussed. The first is going to be Server R1 then Server R2…

![](/images/2023/05/2023-05-08-01_11_08-server-r1.png)
![](/images/2023/05/2023-05-08-01_12_01-server-r2.png)

I wanted to explain the routing table but I think I'll just make a separate blog post for it.

Now onto the next part of our topology, here we are going to focus on **BGP**. We'll be focusing on this part of the topology...

![](/images/2023/05/2023-05-08-01_17_41-pnetlab-_-topology.png)

I also used a serial link between these routers and the router I configured to be the ISP of this network, here are the BGP configurations...

![](/images/2023/05/2023-05-08-01_21_47-r3.png)

On BGP we use something called Autonomous system numbers which is the 65002 number I used there, in simple terms we are giving an ID to this network that's under our management that is what an AS number is. So as usual we first define the protocol and then give it an ID, that first line I don't know where it came from but from my understanding it just means any changes in BGP will be logged onto the console. Second line and third I am telling the router to advertise the routes it learned via EIGRP and OSPF to its BGP neighbor, notice how we specify the EIGRP or OSPF ID so that the proper networks are advertised just in case we have multiple OSPF or EIGRP connections. We then use the neighbor command, this command is telling the router to form a relationship with this router 10.0.1.1 which is found at AS 65001, this must be done on both sides as you'll see on the screenshot of the ISP router below.

![](/images/2023/05/2023-05-08-01_34_44-isp-router.png)

As you can see on the ISP router when we defined BGP we gave it the AS number 65001 and then on the neighbor command we point to R3 and it AS 65002, if you mess up these numbers it won't work, no neighborship will be formed.

Below I will show the routing table of R3, be warned it may be a bit overwhelming, remember R3 is the center of the topology so it learns every route and takes every route out of our network…

![](/images/2023/05/2023-05-08-01_58_57-r3.png)

I wish I could write more on these routing protocols, especially EIGRP and BGP but my understanding is still shallow, I might know how to do configurations, and how some things work but not enough to write about, the goal of this post was to explain the configurations of my lab and I hope whoever is reading this gets what I was doing and if they wanna do something similar on their lab I hope it helps. Thank you for reading, see you in my next post.
