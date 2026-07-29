---
title: "The Routing Table"
date: 2023-07-10
tags: ["routing"]
summary: "I am going to use R3's routing table to explain how I understand the routing table. First and foremost to check a routing table you use the command #show..."
readTime: "5 min"
---

![](/images/2023/05/screenshot-550.png)

I am going to use R3's routing table to explain how I understand the routing table. First and foremost to check a routing table you use the command #show IP route on the privileged EXEC mode. When that command is run we get the first part which is the manual of the routing table, I will crop and paste it below.

![](/images/2023/05/2023-05-10-20_39_53-r3.png)

These are the codes that show us how a route was entered into the table for example if the route was learned via OSPF it would have a O as a code for example the routes below

![](/images/2023/05/2023-05-10-20_43_17-r3.png)

They have the O which means they were put into the table via OSPF. I won't go through all the codes since they are right there on the results.

![](/images/2023/05/2023-05-10-20_48_33-r3.png)

Next, we have this part above, here the router lists the default gateway if it has one learned or configured, if there is no default gateway the message will be something like this…

![](/images/2023/07/image-1.png)

This is telling us that we do not have a gateway of last resort which is the default gateway. Now time to get to the main point of the post, the routes on the table, how they get there, and why the router chooses to put this route over that route.

![](/images/2023/07/image.png)

There's a lot to unpack here but we'll start from the top going down so I will start with the route with the S\* and it has this 0.0.0.0/0 [1/0] 10.0.1.1. As we saw on the codes above S means it's a static route, but if we look at that first route entry on our routing table it has an asterisk, I didn't know about this before writing but I read up on it and this means it is a potential default route that is to say if a definite default route is not entered we may use this route but if it's entered then that route entered will become the gateway.  
What we are saying on that first route is 0.0.0.0/0 which translates to "default route" That's how I interpret it forward those packets to 10.0.1.1 and that's how it's going to be for every route on our table the ip on the left is the route we want to go to then the route on the right indicates the interface we'll use to get there. Let's use a random example from the table O 192.168.1.0/24 [110/2] via 192.168.23.2  
Firstly we have an O there and according to the codes this means we learned this route via OSPF, now what this says is if we want to send packets to an IP under the 192.168.1.0/24 which means from 192.168.1.1-255 we are going to use the interface with the IP address of 192.168.32.2

![](/images/2023/07/image-2.png)

Now on to the part I highlighted, what are those 2 numbers? We'll start with the 110, this is called the administrative distance, AD in short. The AD indicates how "trustworthy" a route is, the lower the AD the more trustworthy it is, the router will choose the lower AD to forward packets, so if we have a route with the AD of 1 and another with the AD of 0 the router will go with the one that has a 0. We have the default AD's known for example above 110 by default means OSPF, here are the other default AD's...

- Directly connected interface: 0
- Static route: 1
- Enhanced Interior Gateway Routing Protocol (EIGRP): 90
- Open Shortest Path First (OSPF): 110
- Routing Information Protocol (RIP): 120
- Exterior Gateway Protocol (EGP): 140
- Border Gateway Protocol (BGP): 200

I won't go any further than this lol cause I know for a fact I don't know much about these things, I am just CCNA level(for now). Now we move on to the other number which was 2 that's metric, each routing protocol has a way of determining how desirable a route is so it's more like the routing protocol having its own "AD" I don't want to use the word AD lightly but it's a similar concept, the protocol does some calculations and groups these routes in a certain way to say I prefer this over this. I will now show the AD/metric from different routing protocols though I won't explain how these are calculated.

![](/images/2023/07/image-3.png)
![](/images/2023/07/image-4.png)

The final part of this post, how do routes get picked for the routing table, how does the router pick one over the other as the route that's gonna be shown on the table?  
Routers can use multiple mechanisms to add a route to the table, they use ADs yes the ones we talked about above, so when a route is being offered by multiple protocols the router trusts the one with the lowest AD. Now if it's multiple routes from the same protocol here the route uses that metric we talked about, metrics differ from protocol to protocol but there's a way in which this metric is preferred over that one, you can read up on that.  
Last but most importantly the router looks at the longest match, this is the most specific route, for example, lets say we have a packet destined for 192.168.1.150 and we have these routes on the table

1. 192.168.0.0/16 via 10.0.0.1
2. 192.168.1.0/24 via 10.0.1.1
3. 192.168.1.128/25 via 10.0.2.1

By longest match I always look it like this, the highest subnet musk wins which means /25 is picked over /24. This goes a bit deeper, there's some in depth knowledge on this but I won't dive into them today, maybe one day when I'm a CCIE and all knowing networking god.

Anyways that's all I wanted to talk about on the routing table, thanks for reading.
