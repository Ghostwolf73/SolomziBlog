---
title: "Etherchannel from a noob"
date: 2023-01-20
tags: ["switching", "ccna"]
summary: "Today I am focusing on this part of my network where I can configure EtherChannel and trunking between the 3 switches. Firstly what is EtherChannel? In my..."
readTime: "2 min"
---

![](/images/2023/01/screenshot-from-2023-01-20-02-04-18.png)

Today I am focusing on this part of my network where I can configure EtherChannel and trunking between the 3 switches. Firstly what is EtherChannel? In my own words, it's the bundling up of links into one link for better speed and redundancy, but for a proper definition and explanation, I will leave a link to a site by people who know better than me.

From the diagram it's visible that 2 cables are used between each switch, here is how I configured those to become one. When configuring EtherChannel there are 3 protocols you can use or modes and there are as follows:

![](/images/2023/01/screenshot-from-2023-01-20-02-14-47.png)

We have LACP which should be activated by having at least one of the sides on "mode active", LACP is a standard protocol which means it works on all devices and it's the most ideal. Secondly, we have PAgP which is put on by having at least one side on "mode desirable" this is a CISCO proprietary protocol which means it only works on CISCO devices. Finally, have mode "on" which just enables EtherChannel. Note that we can't have one switch on LACP and the other on PAgP or just on, the two devices should use the same mode otherwise a channel won't be established.

On my switches I used all 3 modes, on the link between SWITCH and L3-SWITCH I used mode on, here is the configuration on SWITCH:

![](/images/2023/01/screenshot-from-2023-01-20-02-35-23.png)

Then the configuration on L3-SWITCH is as follows:

![](/images/2023/01/screenshot-from-2023-01-20-02-36-51.png)

Then between SWITCH and L3-SWITCH2, I used LACP and here are the configurations on both switches:

![](/images/2023/01/screenshot-from-2023-01-20-02-40-51.png)
![](/images/2023/01/screenshot-from-2023-01-20-02-43-07.png)

The channel groups can have different ID it doesn't affect anything, as the above screenshots show I used channel-group 2 on SWITCH and channel-group 1 on L3-SWITCH2, all that matters is the protocols matching, and here since I used LACP you need ATLEAST one side to be active, that means you can have ACTIVE on both sides but can't have the same with PASSIVE.

Finally on the two links between L3-SWITCH and L3-SWITCH2 I used PAgP and here are the configurations:

![](/images/2023/01/screenshot-from-2023-01-20-02-49-01.png)
![](/images/2023/01/screenshot-from-2023-01-20-02-50-22.png)

Now to confirm we can use the following commands:

![](/images/2023/01/screenshot-from-2023-01-20-02-53-13.png)
![](/images/2023/01/screenshot-from-2023-01-20-02-53-13-1.png)

And if you show your interfaces the channel groups should appear like so:

![](/images/2023/01/screenshot-from-2023-01-20-02-51-54.png)

To configure this new port you just type it out like a normal interface:

![](/images/2023/01/screenshot-from-2023-01-20-02-58-21.png)

Links for better and proper etherchannel explanations.

https://study-ccna.com/what-is-etherchannel/

https://www.cisco.com/c/en/us/support/docs/lan-switching/etherchannel/12023-4.html

Thank you reading.
