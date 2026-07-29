---
title: "OSPF Troubleshooting Pt.3"
date: 2024-07-22
tags: ["routing"]
summary: "Hopefully this is the final post on this lab... We are left off on R5, we had configured the serial interface so it's time to deal with Eth0/0 Off the..."
readTime: "3 min"
---

Hopefully this is the final post on this lab...

![](/images/2024/07/screenshot-2068.png)

We are left off on R5, we had configured the serial interface so it's time to deal with Eth0/0

Off the gate R5 is giving me a message about a key expiring, I suspect this means the lab was being configured with OSPF authentication but there are errors on the configurations. First thing, I will run my life saver command "show run" on both routers and then compare the configurations.

![](/images/2024/07/image-19.png)
![](/images/2024/07/image-20.png)

I think we just need to add a password on R6 which is identical to one on R5, because for OSPF authentication to work the 2 passwords should match.

![](/images/2024/07/screenshot-2024-07-22-184659.png)

I did the same configuration and I am getting an error, I don't know what might be the problem but I will just configure OSPF authentication from scratch on both interfaces then in my spare time will research what causes this, and when I learn I will probably write about it.

![](/images/2024/07/image-21.png)

And this created a neighborship between the two, which we can see below.

![](/images/embedded/ospf-troubleshooting-pt-3-embedded-1.png)

![](/images/2024/07/image-22.png)

This made me realize two things, R5 has no neighborship with R4, which means there's something I missed on the serial links, secondly, R6 ID is 7.7.7.7 which I suspect will cause problems in the future because if my predictions are right the Router ID's match the Router numbers so I guess R7 will also have 7.7.7.7 as it's ID which will mean we can't form a neighborship because unlike areas, networks, MTU, RID must not be the same.

First lets deal with R5 and R4 serial links.

![](/images/2024/07/image-23.png)

I went to R4 and realized that OSPF is configured to use the non-broadcast network whilst this was not specified on R5 which means R5 is using broadcast(default) and if these don't match then we cannot form a neighborship because types of OSPF networks have different timers which creates a mismatch.

So for this lab, I will configure each side to use ospf point-to-point network just to configure it for fun and this is literally a point-to-point if we were in the real world so let's go!

![](/images/2024/07/image-24.png)

I have configured R4 and for some reason, a neighborship has been formed I have no idea why because I am pretty sure the other side is using broadcast, well that's something I have to research too and learn more about. Now we configure R5.

![](/images/2024/07/image-25.png)
![](/images/2024/07/image-26.png)

And we up.

Now let me confirm the RID(Router ID) of R7 and see if I am right.

![](/images/2024/07/image-27.png)

And I was right R7's RID is 7.7.7.7 which means it is the same as R6 so let's fix that.  
I went into R6 and I was expecting the loopback interface to be configured as 7.7.7.7 but look what I found.

![](/images/2024/07/image-28.png)

This means the RID was configured manually which is quite fun because you'll see me change it.

![](/images/2024/07/image-29.png)

Indeed it is configured manually, time to change it!

![](/images/2024/07/image-30.png)

And we have changed it but we had to restart OSPF because if you don't it will still use the original RID.

![](/images/2024/07/image-31.png)

Moreover I just realized that OSPF is not configured at all on Eth0/0 of R6 let's check R7

And it is configured, let's configure it on R6 and see.

![](/images/2024/07/image-32.png)

And there was no movement so I ran a, you guessed it! show run and look what I found on R7

![](/images/2024/07/image-33.png)

OSPF is configured as a stub and again this has to match on both sides so back to R6.

![](/images/2024/07/image-34.png)

Funny story I have been stuck on this for more than 30 minutes, I did all the configurations but I just couldn't form an adjacency I kept changing things, even changed IP addresses and nothing happened then I disconnected the cable on both sides and connected it back then it worked. I don't if this is a bug on the emulator or what but I am just glad it worked, now it's time to check if the whole lab is connected.

First look at R7 routing table and how beautiful it is.

![](/images/2024/07/image-35.png)

I cooked!

Now let's ping PC2...

![](/images/2024/07/image-36.png)

Look at that beauty, tears in my eyes man.

Thank you for reading and staying for my rumbling, catch you next time!
