---
title: "NAT Overload"
date: 2023-01-16
tags: ["routing", "ccna"]
summary: "Since R1 is connected to the NAT cloud and gets an IP via DHCP it means it can go outside of this network, it can access the internet. I can ping google..."
readTime: "3 min"
---

![](/images/2023/01/screenshot-from-2023-01-11-19-04-34-1.png)

Since R1 is connected to the NAT cloud and gets an IP via DHCP it means it can go outside of this network, it can access the internet. I can ping google from the router and by default, I thought since my PC's default gateways are on that same router I could ping google or access the internet from them. I kept on trying to ping and I'd get the user unreachable, I thought something was wrong so I went to discord and asked around, and the answer I got was a simple question "did you configure NAT?" it was at that point I realized that I had forgotten that I am using private IP addresses and they NOT routable(can't go out of the network). Though I had planned to have a separate lab dedicated to NAT I had to configure it on this network cause I just wanted to see my PC goes out.

So what is NAT and why do we use it? from that first paragraph, one can get an idea of what NAT does but here we go, NAT stands for Network Address Translation, which means taking an IP address and covering it up with a public address so that it is routable. There are different types of NAT and since I am planning to do a lab on it in the future I'll explain all of them there, for now, I will just write about the configurations I did on the router so that my PCs can reach the internet. I used something called NAT overload.

To configure NAT overload I first created an Access List(I will make a lab for these too in the future) below is the command I used to create this Access List.

![](/images/2023/01/screenshot-from-2023-01-16-17-32-54.png)

This command is saying allow traffic from IPs that start with 192.168 to pass through, again I will have a lab on access lists where I will explain everything. The second thing I did was issue the NAT command and use the access list created above to make this possible.

![](/images/2023/01/screenshot-from-2023-01-16-17-37-10.png)

Here we are configuring NAT using the access list that's why we have the "source list 1" which is a reference to access-list 1 which we created above. The overload indicates that we configuring NAT overload. Next, we go to the interface that's the gateway for the network but here in this lab remember we created subinterfaces so we have 3 virtual interfaces that are gateways to 3 different VLANs. Each one of those interfaces needs to be told on which side of NAT it is on and this is how you do that.

![](/images/2023/01/screenshot-from-2023-01-16-17-42-31.png)

We then go to the interface that connects to the outside network(NAT cloud in this case) and indicate which side of NAT it's on.

![](/images/2023/01/screenshot-from-2023-01-16-17-46-15.png)

And just like that you are done with the configurations and the hosts can ping public networks.

![](/images/2023/01/screenshot-from-2023-01-16-17-48-30.png)

I will be adding links to where one can read about what I just did in detail because I am not a teacher, I am just applying my knowledge to my labs and trying to explain it so if someone needs to read in-depth on a specific topic they will have to follow the links I'll put.

Thanks for reading.
