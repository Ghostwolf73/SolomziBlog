---
title: "OSPF Troubleshooting Pt.2"
date: 2024-07-19
tags: ["routing"]
summary: "Let's continue where we left off... So to refresh, we have fixed the configurations on R1 and R2, we have a neighborship between those two, now onto R3...."
readTime: "2 min"
---

Let's continue where we left off...

![](/images/2024/07/image-10.png)

So to refresh, we have fixed the configurations on R1 and R2, we have a neighborship between those two, now onto R3.  
As usual, I ran a show run and lucky enough on my show run I picked up the problem and here is the screenshot.

![](/images/2024/07/screenshot-2024-07-19-171946.png)

On interface Eth0/0 which directly connects to R2 and is the one we are hoping to form a neighborship on we can see that the dead-interval and hello-interval have been manually configured which means the router is no longer using the defaults of 10 seconds for hello and 40 seconds for dead. This means you can't form a neighborship because for two routers to form a neighborship those 2 have to match, and so does the network, MTU, area, and the RID(Router ID) have to be different.

I went into the interface and removed those 2 commands and boom! a neighborship was formed.

![](/images/2024/07/screenshot-2024-07-19-172136.png)

Now just for the fun of it let's look at R3 routing table and see what it has learned.

![](/images/2024/07/image-11.png)

Bingo! on to the next!

I ran a show run on R4 and found a bunch of ACLs (access lists) I don't know what the intention was but the first ACL completely denies anything that has OSPF in it so no neighborship can be formed.

![](/images/2024/07/image-12.png)
![](/images/2024/07/image-13.png)

So I will just get rid of the ACL's. First I had done that but no neighborship was formed again so I went over to R3 and found out that the interface was set to passive which means it can not form neighborships I don't if this was intentional too but I got rid of it since I am just trying to set up a connection nothing complicated.

Then I got rid of the ACL on R4...watch the magic.

And just like that we are done here, let's check the routing table.

![](/images/2024/07/image-14.png)

Next!

On my first R5 show run I have already found something suspicious...

![](/images/2024/07/image-15.png)

MTU is configured manually and when I check on R4 it's not which means R4 is using the default hence we have a mismatch and cannot form an adjacency. Let's see what happens when I remove that command.

![](/images/2024/07/image-16.png)

Hmmm nothing, let's check the interface on R4 now.

![](/images/2024/07/image-17.png)

Seems like on R4 the OSPF type is non-broadcast, which can be a problem if the other side is not because these are "types" of OSPF, so let's get rid of that and see.

![](/images/2024/07/image-18.png)

And we are up!

This will be the cut-off for this post which means we are left with R6 and R7 then we test the connection.

See you on the next post.
