---
title: "Spanning Tree Protocol for CCNP"
date: 2023-01-31
tags: ["switching", "ccnp"]
summary: "In my CCNP studies today I was focused on STP(Spanning Tree Protocol). This is one of the most important protocols in Layer 2 and I am gonna explain why..."
readTime: "6 min"
---

In my CCNP studies today I was focused on STP(Spanning Tree Protocol). This is one of the most important protocols in Layer 2 and I am gonna explain why below. I am sure I have mentioned STP once or twice in my lab blog posts but here I will be dealing with a deep dive-like approach, check out the theory and what goes on behind the scenes.

Firstly we have to be clear on what spanning tree is and what it does, STP also known as 802.1D is a protocol that provides support for ensuring a loop-free topology, in simple terms, this is a protocol that makes sure we don't have any loops in our topology.

Ports have different states and they transition from state to state, here are the STP port states with a brief explanation for each:

Disabled - here the port is shut down.

Blocking - the port is up but does not forward traffic to make sure there are no loops. In this state the switch does not modify it's MAC Address table it only receives BPDU from other switches.

Listening - here the port has moved from the blocking state, it can now send BPDU's but can't forward any other other traffic.

Learning - in this port state only BPDUs are forwarded still but the switch can now modify the MAC address table with any traffic it receives.

Forwarding - final state, the switch can forward all traffic and update the MAC address table as expected.

Broken - well here it's broken, this just means the switch detects a configuration or operational problem on a port and the port discards frames as long as the problem exists.

From port states we now move to Port types in STP:

Before getting into these port types there are a few terms I want to define first and here we go:

Root bridge - this is the master of the topology, all its ports are in a forwarding state and every port is a designated port(will be explained below)

BPDU stands for Bridge Protocol Data Unit - used to identify the hierachy on the switches and notify changes to the topology. 01:80:C2:00:00:00 is the destination MAC address used by BPDU.

Now back to the port types…

Root port - This is the port that connects to the root bridge or an upstream switch in the topology, there is only one of this port type per VLAN on a switch.

Designated port - receives and forwards BPDUs to other switches. It provides connectivity to downstream devices(end devices) and switches, there should be one designated port per link.

Blocking - does not forward traffic.

Next is STP Path cost according to geeks for geeks it is the sum of the port costs of all ports included in the path from the non-root switch to the root switch. It has 2 modes, the default is called the short mode which is a 16-bit value with a reference speed of 20Gbps and this is the older method, now we have the long method which uses a 32-bit value with a reference speed of 20Tbps. Devices can be configured with the long method using the command (config)# spanning-tree path cost method long, when this command is entered it should be done across all switches on the topology.

I mentioned that the root bridge is the "master" but how does a switch become this master? There are elections done and this is how it goes...

When a switch boots up it assumes that it is the root bridge until it listens to what its neighbors have configured. Here is how the election then goes.

1. if the neighbor's BPDU is inferior to the switch it's own the switch ignores it.
2. if the neighbor's BPDU is superior to the switch on it's own the switch updates its BPDU to include the new root bridge and new root path cost. This process is repeated until all switches know which switch is the root bridge.

STP goes for the lower priority in the bridge ID, if these are equal it uses the lowest MAC address and btw older switches generally have lower MAC addresses. You can use the following command to check the root bridge #show spanning-tree root.

Now how does the switch select a root port?

1. the interface associated with the lowest path is preferred.
2. next is the interface associated with the lowest system priority of the advertising switch.
3. interface associated with the lowest system MAC advertising switch
4. when multiple links are associated with the same switch, the lowest port priority from the advertising switch is preferred.
5. then finally the lowest port number is the one that wins.

Locating Blocked and designated switch ports:

If 2 non-root switches are connected one of their designated ports should be blocked to avoid loops. So how does the port that gets blocked get picked?

1. interface is a designated port not considered a root port.
2. Switch with the lower path cost to the root bridge forwards packets while the other one gets blocked.
3. if there is a tier then the system priority of a switch is lower then it forwards whilst the other one gets blocked.
4. if there is a tier again the one with the lowest MAC becomes the designated port(forwards)

STP topology changes.

TCN, Topology Change Notification.

The switch that detects a change sends a TCN BPDU towards the root bridge via its RP(root port) and when the root bridge receives this TCN it creates a new configuration BPDU withe the change flag set and then floods it to all switches. The switches that receive this then change their MAC address time to the forward delay which is 15 seconds by default, this is done to remove inactive devices after that 15 seconds. TCNs are generated on a VLAN basis.

RSTP, Rapid Spanning-tree Protocol (802.1W)

This is a faster and more advanced STP, it was created after CISCO had created the Per VLAN Spanning-tree.

RSTP Port states:

Discarding - it is the combination of the STP disabled, blocking, and listening states. The port is enabled but does not forward traffic.

Learning - still the same as how it is for STP.

Forwarding - still the same too.

RSTP port roles:

Root port - it's defined above

Designated port - also defined above.

alternate port - this port provides alternative connection to the root bridge via another switch.

Backup port - a port that provides a link redundancy towards the root bridge, only exists when multiple links connect between two switches.

Port types

Edge ports - a port at the edge of the network, where end devices connect. It can't form a loop.

Root port - defined above.

Point to Point port - any port that connects to another RSTP switch with full duplex apparently full duplex links do not permit more than two devices.

That's basically all I have covered on STP, I only emitted how the RSTP topology is formed, thank you for reading.

A link to stp explained by an expert.

https://study-ccnp.com/spanning-tree-topology-tuning-optimization/
