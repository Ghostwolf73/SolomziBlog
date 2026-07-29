---
title: "MPLS basic lab"
date: 2024-07-07
tags: ["routing"]
summary: "MPLS, Multi-Protocol Label Switch is a WAN technology though it is aging, it is still quite popular. MPLS is used as a routing system that transfers data..."
readTime: "4 min"
---

MPLS, Multi-Protocol Label Switch is a WAN technology though it is aging, it is still quite popular. MPLS is used as a routing system that transfers data between networks using labels instead of network addresses.  
Today's lab will be centered around MPLS, BGP, and OSPF so let's get started!

![](/images/2024/07/screenshot-2024-07-07-150851.png)

This is our topology but let's first define a few terms used for MPLS before going forward.  
First is CE which is Customer Edge  
PE Provider Edge  
P Provider Core.

On our topology, we have 6 routers, R1 and R6 as CE routers, R2 and R5 as PE routers whilst R3 and R4 as P routers. R1 and R6 are the main offices that will have to communicate directly using BGP whilst R2 to R5 are under AS 200 and act like our service provider where R1 and R2 will run their communication through.

Now to the configurations, first I ran basic configurations for all routers and they go as follows:

![](/images/2024/07/screenshot-2024-07-07-100844.png)

The configurations are almost identical for every router with differences like hostnames and IP addresses so showing all six of them will be redundant.

The second thing was to configure the IP addresses for all the interfaces according to the labels on the topology, you'll notice that after every configuration I use "wr" to save my configurations, this is because this was the second time I built this lab first time as I was about to finish my server on the VM rebooted and all my nodes rebooted too so I lost everything so now I am paranoid.

![](/images/2024/07/screenshot-2024-07-07-101203.png)

Next, I configured an IGP(Interior Routing Protocol) on the routers that belong to AS (Autonomous System) 200(R2, R3, R4, R5) and I chose my favorite routing protocol as the IGP for our service provider which is OSPF.

![](/images/2024/07/screenshot-2024-07-07-103156.png)
![](/images/2024/07/screenshot-2024-07-07-103302.png)
![](/images/2024/07/screenshot-2024-07-07-103447.png)
![](/images/2024/07/screenshot-2024-07-07-103552.png)

As you go through the screenshots in order you can see the OSPF adjacencies forming and notifications showing on the screen which is what you want to see.

To confirm(out of paranoia) we check the IP routes to see if OSPF is at work and the screenshot below shows that we are on the right track and we do this on R3.

![](/images/2024/07/screenshot-2024-07-07-103909.png)

We can see that R3 has 4 routes on its routing table learned via OSPF, now on to the next step which is enabling MPLS on the AS200 routers and this was done by just one command(shocker I know).

![](/images/2024/07/screenshot-2024-07-07-104138.png)
![](/images/2024/07/screenshot-2024-07-07-104223.png)
![](/images/2024/07/screenshot-2024-07-07-104307.png)
![](/images/2024/07/screenshot-2024-07-07-104339.png)

If you look at the screenshot you'll see a syslog message that says something about LDP Neighbor being up this means an LDP session has been established but what is LDP? LDP stands for Label Distribution Protocol this is the protocol that MPLS uses to share labels amongst its routers. We then check if our MPLS configurations are working:

![](/images/2024/07/screenshot-2024-07-07-104501-1.png)

The next task was configuring iBGP between PE1 and PE2, eBGP between PE1 and CE1, and eBGP between PE2 and CE2.  
iBGP is internal BGP, with an AD of 200 whilst eBGP is the external BGP with an AD of 20. iBGP is used to connect networks in the same AS whilst eBGP is used to connect networks in different AS.

![](/images/2024/07/screenshot-2024-07-07-104637.png)
![](/images/2024/07/screenshot-2024-07-07-105021.png)
![](/images/2024/07/screenshot-2024-07-07-105519.png)
![](/images/2024/07/screenshot-2024-07-07-105636.png)

Again as you go down you can see syslog messages showing that things are going up, we are cooking.

We go to R2 to check the BGP summary like so…

![](/images/2024/07/screenshot-2024-07-07-105728.png)

Now finally it's time to redistribute routes from CE1 and CE2 into BGP.

![](/images/2024/07/screenshot-2024-07-07-105945.png)
![](/images/2024/07/screenshot-2024-07-07-160911.png)

I forgot to take a screenshot for R6 so had to run the show run config command and take the screenshot from there that's the config won't look "live"

Now here is where I had a challenge, all configurations are done and I check my routing table on R1, and boom this is what I get:

![](/images/2024/07/screenshot-2024-07-07-115624.png)

R1 hasn't learned about the path to R6 via BGP. This was a huge challenge and I spent almost an hour going through my configurations line by line and I was messing up some things that were already working trying to fix the final piece. The mistake I made was a silly one which happens a lot when dealing with configurations, if you scroll back up where I configured IP addresses you'll see that I configured loopback interfaces with a /27 mask instead of a /32 so my masks were 255.255.255.224 instead of being 255.255.255.255 then when you scroll down to the BGP configs between R1 and R6 I specifically tell BGP that the mask is supposed to be /32 whilst the devices had /27 so with this BGP was still waiting to see these /32 networks which didn't exist lol.  
Now watch as I fix my mistake how everything lights up…

![](/images/2024/07/screenshot-2024-07-07-113848.png)

and look at the routing table now on R1...

![](/images/2024/07/screenshot-2024-07-07-115639.png)

And we can ping 6.6.6.6 the source being our loopback0 interface.

So what happens here is the 2 Routers R1 and R6 will be connected like it's a direct connection, they don't need to be running MPLS that's the job of the service provider, to make things simple the whole service provider infrastructure R2, R3, R4, R5 is like a big switch which R1 and R6 are connected to and that's what MPLS is.

That's all for this lab, thank you for reading, and catch you next time!
