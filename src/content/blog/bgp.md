---
title: "BGP"
date: 2025-12-11
tags: ["routing"]
summary: "Okay, today I will be specifically focusing on BGP. This has been a protocol I have been actively dodging because I do not have a lot of experience with..."
readTime: "6 min"
---

![](/images/2025/12/screenshot-2025-12-01-195337.png)

Okay, today I will be specifically focusing on BGP. This has been a protocol I have been actively dodging because I do not have a lot of experience with it in the real world, but since I am preparing for my CCNP, it came up, and I decided to touch on it.

We will be using the lab above for configurations. It's not a fancy lab; it's quite straightforward. We have 3 directly connected networks between the routers, then each router has its own LAN network, so 7 networks in total. We will use iBGP and EIGRP.

First and foremost, let's get definitions out of the way. What is BGP? It stands for Border Gateway Protocol, BGP is THE routing protocol, it is the routing protocol for the internet, it is the routing protocol that works in the grand scheme of networking, while OSPF, EIGRP and so on work in our offices BGP on the other hand makes sure we go further, it connects Autonamous systems together, it is the routing protocol designed for scalability, stability, routing policy and NOT speed, I repeat it's THE routing protocol.

BGP is quite complicated, and until I am that good at it, I won't talk a lot about it, so let's get to the configs.

First, I configured the IP addresses as shown on the topology, then I added loopback interfaces for each router, and here is the screenshot of how the ports look:

![](/images/2025/12/image.png)

Next, I configured EIGRP as an IGP because BGP depends on an interior gateway protocol(IGP) inside an Autonomous System(AS). This is because BGP only advertises routes, not how to reach its neighbors; it is not designed to discover neighbors and build internal topologies and all those things. It focuses on the bigger picture. So this time I used EIGRP as my IGP because I have used OSPF a lot(it's my favorite protocol after all). Below are my configs for EIGRP.

![](/images/2025/12/image-2.png)
![](/images/2025/12/image-3.png)
![](/images/2025/12/image-4.png)
![](/images/2025/12/image-5.png)

That's R1, 2, 3, and 4 in order. Nothing fancy, just simple EIGRP, but note we are not advertising the LAN subnets.

Next was BGP itself. I configured iBGP, which is internal BGP, on all 4 routers, but on R2 and R4, I used a peer-group. So what is iBGP? This simply means we run BGP between our routers, which are in the same AS. There is also something called eBGP, which is THE BGP, and the e, as you may have guessed, is for External; this one we use it between AS's

One may wonder, "Why not just use OSPF or EIGRP?" The answer is simple: the routing table of the Internet contains more than a million routes, and IGPs like OSPF and EIGRP are not designed for this scale of prefixes. So when our routers learn prefixes from different AS's with eBGP, they can then be advertised through iBGP without any issues. Another reason is that BGP stores a lot of information when it comes to its prefixes with attributes, and with IGP's that information can sometimes be lost, for example, an AS Path when redistributed into an IGP, that information is lost, so we use iBGP.

iBGP, as good as it is, is quite limited and needs an underlying IGP like OSPF or EIGRP for the connectivity between iBGP neighbors. Something to note about BGP is that it does not use hello packets to discover neighbors, as a protocol like OSPF does. BGP CANNOT DISCOVER NEIGHBORS DYNAMICALLY. BGP was designed as an inter-autonomous routing protocol, which means that neighbor adjacencies should not change frequently.

Now, before I show the configs for IBGP, I will also like to point out that IBGP does not change the next hop by default, which can lead to some issues when it comes to reachability, but these can be solved with:

- The "next-hop-self" command to change the next hop to the IBGP router
- Advertising an additional prefix with the "network 10.net.net.net" command.
- Loopback interfaces for IBGP neighbor adjacencies are the best because they never go down.

IBGP requires a full mesh, meaning all IBGP routers must peer with each other.

Now onto the configs.

R1:

![](/images/2025/12/image-6.png)

R2:

![](/images/2025/12/image-7.png)

R3:

![](/images/2025/12/image-8.png)

R4:

![](/images/2025/12/image-9.png)

So what's going on up there, you can see that configurations for R1 and 3 are almost identical. That is because for R2 and 4, I used peer-group configuration, which is more like using a template for your configurations, so instead of repeating commands, you configure one neighbor and the other gets the configs from it, similar to how we configure VLANs with VTP.

Now, let's look at the commands line by line

First, we tell the router that we are using BGP and define our AS, which is 254; that's the first command.

Second is the router-id, self-explanatory.

"bgp log-neighbor-changes" enables logging every time BGP neighbor states change from up to down or vice versa.

The neighbor and remote as command defines our BGP neighbor, and we also define its AS, which is the same as ours, so it's an iBGP.

The neighbor command with a password is just us enabling MD5 authentication between the neighbors for security, which helps prevent spoofed TCP resets and more.

Next, we have the route-reflect-client, which means this Router is a Route Reflector(RR). This allows it to reflect routes between its iBGP peers, overcome the iBGP full mesh requirement, and reduce the number of required sessions

For R2, I will only touch on commands that are different from those we covered in R1:

"neighbor RRS peer-group" creates a peer group named RRS, then we use neighbor RRS remote-a,s, which means this group will apply to neighbors in this AS.

"neighbor RRS password," we are just giving the group a password, then we assign neighbor 1.1.1.1 to the group, and 3.3.3.3

For R3:

We make R3 a route reflector client, which means it reflects iBGP routes between itself and its peers

For R4:

Nothing we haven't covered above.

With this, we have a full IBGP topology. Now we just need to advertise the LAN networks.

![](/images/2025/12/image-10.png)

We use just one command, which is the "network command". Now, let's see if the routes are advertised.

![](/images/2025/12/image-11.png)

We see that R1 now has the 3 other LANs on its Routing table. Now, let's just ping and test:

![](/images/2025/12/image-12.png)

Clean. I won't go through each router because that would be redundant, and for this post, we will stop here. Hopefully, I did a good job in explaining these concepts. It's been a long time since I wrote a post, so I was rusty.

Thank you for reading. If you have any questions, just contact me. Have a great one, catch you on the next post.
