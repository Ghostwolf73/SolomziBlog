---
title: "IPv6"
date: 2024-07-30
tags: ["routing"]
summary: "IPv6, IPv6, is the savior of our IP addressing. Where did it come from and why? well first and foremost let's have a history lesson, a bit about IPv4...."
readTime: "4 min"
---

IPv6, IPv6, is the savior of our IP addressing. Where did it come from and why? well first and foremost let's have a history lesson, a bit about IPv4.

IPv4 is the IP address I have been using for labs and is what you will see mostly, well for now but this version of IP addressing has a huge problem, what problem? we are running out of addresses to use. One may ask how? When IPv4 was first invented, a long time ago, with it being 32 bit it gave us 4 294 967 296(4 billion 294 million 967 thousand 296) back then this seemed like a lot of IP addresses and I am sure these guys were like "yeah we did it" but again that was a long time ago, fast forward to today we are exhausting these IP addresses, why and how? well, we have a lot of devices now that use IP addresses for example right now I have 2 laptops, a TV, a router, a range extender, a phone, tablet and that's just me alone, I live with 4 other people who have more or less the same number of devices and with that you can see why we are running out of IP addresses. They tried to save IP addresses with RFC-1918 which was the introduction of private IP addresses but still that did not work, it just stalled the inevitable. So here comes the hero the better version which is version 6, IPv6.

IPv6 is a HUGE upgrade from IPv4, you can see it's huge because it skipped 5 and went straight to 6(I'm joking I don't know why they skipped 5) Unlike IPv4 which is 32 bit IPv6 is 128 bit which means it's four times larger than IPv6 and the number of addresses we have is…wait for it… 340,282,366,920,938,463,463,374,607,431,768,211,456 I am sorry I can not say that number out loud.

We know how an IPv4 address looks like, the normal **192.168.1.1/24**. IPv6 on the other hand is quite different, this different; **2001:0db8:0000:0000:a1111:0000:b222:c333/64** looks strange right? that's because IPv6 uses hexadecimal. I won't explain what hexadecimal is, you can google that.  
The obvious differences we can see here besides the hexadecimal and dotted-decimal notation is that IPv4 uses dots to divide its octets while IPv6 uses semicolons to divide its hextets yes that's what they are called.

Another difference is when we see a /24 on IPv4 addresses we know it's talking about the subnet mask, IPv6 got rid of subnet masks, and the slash just means the number of network bits, so if it's /64 like our example it means half of the address(64 bits) belongs to the network and the other 64 belongs to the hosts, /64 is what you'll mostly see it's like the IPv6 version of /24 but you will see different ones here and there.

IPv6 addresses look long and intimidating, we can try to shorten it up just a bit. We have 2 ways of doing so, firstly we remove continuous 0's and replace them with::, which means a whole hextet or hextets of 0's as long as they are continuous so from the above IP address we can do it like this **2001:0db8::a1111:0000:b222:c333/64** but there is a catch, you can only use this once, you can't change that IP address to **2001:0db8::a1111::b222:c333/64** the computer wouldn't know what to do with that.

Secondly, we can get rid of leading zeros, which means any hextet that starts with a 0 we can remove that 0, only the leading 0's. So on that IP address, it will be like this **2001:db8::a1111:0:b222:c333/64,** you see on that hextet of zeros only we left one zero, the computer will know that the other 4 characters are zeros.

So our shortened IP address is going to be **2001:db8::a1111:0:b222:c333/64** it is still quite long compared to IPv4 but hey that's the price we pay for more IP addresses.

I will close off on the types of IPv6 address:  
**Global Unicast** This IP address is publicly routable more like a public IP address and we see it by this **2000::/3**, so when you see an IP address that starts with a 2 or 3 just know its a global unicast

**Unique local**  
Routable in a LAN network, more like a private IP address you can see it with **FC00::/7** that C can sometimes be D.

**Link Local**  
Not routable over a network they are those quick default IP addresses, on IPv4 i think they are 169. something, they are given to hosts that cannot get an IP address for some reason. We identify these by **FE80::/10**

**Multicast**  
Of course multicast, an address for a group. We can ID an IPv6 multicast address by **FF00::/8**

**Anycast**  
IPv6 is interesting, it allows us to use the same IP address, so with anycast if let's say 2 devices use that same address, the packet will be delivered to the closest device. We identify anycast address using **2000::/3** pay attention they look like a global unicast address…

That's it for this post, I hope in the future I can build a lab with IPv6 addressing, just a simple lab, and go on from there, thank you for reading!
