---
title: "Routing"
date: 2023-03-03
tags: ["routing", "ccnp", "ccna"]
summary: "When we want to communicate with devices in our network use layer 2, which is MAC addresses. At layer 2 we don't really need routers, we can work with..."
readTime: "6 min"
---

When we want to communicate with devices in our network use layer 2, which is MAC addresses. At layer 2 we don't really need routers, we can work with nothing but switches which would use MAC address to send frames from A to B. However when we start introducing other networks, other subnets we have to then introduce layer 3, the layer that deals with IP addresses and this is where routers come in, routers deal with interconnecting networks that is to say we may have a 192.168.1.0 /24 network and a 192.168.2.0/24 network, for these two to connect, we need a router because a switch can not go out of its subnet. We saw this in the previous post when we used VLANs to separate networks and we had to configure a router on a stick to have a connection between the subnets.

![](/images/2023/03/screenshot-80.png)

I am gonna use this lab to explain routing, I will be using the lab to explain things how we get from this network to that network. The first thing I have to put out there is that every interface on a router is on its own network, so for example let's look at R1 which is on that orange box labeled "area 2" the interface on the left is on its own network while the interface on the right is on its own network.

We have 2 types of routing, static routing, and dynamic routing though one can say we also have a third which is default routing, I will also explain default routing so no pressure.

Firstly I will go with **static routing**, what is a static route and how do we configure it? A static route is a route we manually configure on a router, we literally tell the router "Hey router, for you to get to the 10.1.1.0/24 network you must go through this FastEthernet 0/0 or go via 10.1.2.1" we are basically hard coding a route into a router. We have 4 types of static routes and these are as follows, with their configurations:

1. **Attached Static Route** This is a route that specifies the destination network and the outbound interface we will use to access that network and below is the configuration example.`R1(config)# ip route 10.1.1.0 255.255.255.0 FastEthernet 0/0`
2. **Recursive Static Route** This is a static route that has the destination network and next hop address and its configuration is very similar to the attached static route we just put the next hop address instead of the interface: `R1(config)# ip route 10.1.1.0 255.255.255.0 10.2.2.1`
3. **Fully Specified Static Route** This is a route where the name states we FULLY specify, that is to say, we add the network, outbound interface, and next hop IP address, it's like a mixture of the first two for example: `R1(config)# ip route 10.1.1.0 255.255.255.0 FastEthernet 0/0 10.2.2.1`
4. **Floating Static Route** This is a static route with an administrative distance(we'll explain this later), it's more like a backup route: `R1(config)# ip route 10.1.1.0 255.255.255.0 10.2.2.1 25` with that "25" being the administrative distance.

Note that you can have these routes done in IPv6 you just need to specify on the configuration, replace the "ip" with "ipv6" and of course replace IPv4 addresses with IPv6.

**Dynamic Routing**

Dynamic routing is when a router learns routes on its own, that is to say **dynamically**, what this means is we do some configurations on routers and then they exchanged routes on their own. Dynamic routing is a little broad and more complicated than static routing, here we deal with something called routing protocols.

First I should mention something called an autonomous system which I am going to mention a lot in the future, I will use AS to avoid typing that long name. So what is an AS? This is a network under one administration, this means we have routers with their respective subnets interconnected and these routers belong to one management like they are run by a single administration.

Routing protocols that route within an AS are known as Interior Gateway Protocols(IGPs) for example RIP, EIGRP, OSPF and IS-IS and those that route between AS are called Exterior Gateway Protocols(EGPs) for example BGP, though BGP can work as an IGP. BGP that works as an IGP is known as interior BGP(iBGP) and one that works as an EGP is call external BGP(eBGP)

When it comes to IGPs we have two types of IGPs or let me say two categories which are ***Distance Vector*** and ***Link State**.*

**Distance Vector**

RIP is the primary example of a distance vector routing protocol because EIGRP is ify. Routing protocols like RIP advertise routes as vectors where distance is measured using a metric such as hop count, which means the number of interfaces it goes through to get to a destination network.

Distance vector routing protocols use less hardware because they don't need to map the whole network and do complicated calculations and they are not reliable, why am I saying that? well just because it took you 3 hops to get to the network does not mean it's the best way there what if those 3 hops used ethernet links, very slow. It's an old method that just looks at things at face value which won't work now cause we need information sent from a to b as fast as we can.

**Link State**

OSPF is the primary example of a link-state routing protocol. Link state protocols solve the problem with distance vector I listed above but it comes with a cost, they use more hardware because the network must be mapped so that the router can calculate the ***BEST*** path out. Here we can have 5 routers(5 hops) taking us to a network with GigaEthernet links vs 3 routers going to the same network with an ethernet link and the routing protocol would pick the 5 hops route because it is way faster. I will get more into detail with Link state routing protocols, OSPF to be specific and how it works, how it's configured.

**Path Vector**

This is for EGPs, it's like the distance vector it does not care about the best path or all that instead it looks at various attributes and since here we just have BGP, it looks at BGP attributes to be specific and these attributes include.

1. Autonomous System Path(AS-Path)
2. multi-exit discriminator(MED)
3. origin
4. next hop
5. local preference
6. atomic aggregate
7. aggregator

To be honest I don't know what these means yet cause as I am writing this I just started reading on BGP, I am still clueless on how it works but don't worry I will have a BGP post in the future.

I think I am gonna stop here for today, will try to do a follow up and go deep into these protocols especially OSPF based on that lab above.

Thank you for reading.

You can read more on these topics from the following links

Routing: <https://www.cisco.com/c/en/us/products/routers/what-is-routing.html#~the-process>

Static routing: <https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/unicast/503_u1_2/nexus3000_unicast_config_gd_503_u1_2/l3_route.html>

Dynamic routing: <https://gomotive.com/blog/what-is-dynamic-routing/>

static vs dynamic: <https://www.geeksforgeeks.org/difference-between-static-and-dynamic-routing/>
