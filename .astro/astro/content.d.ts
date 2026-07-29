declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"ansible-vyos-lab.md": {
	id: "ansible-vyos-lab.md";
  slug: "ansible-vyos-lab";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"bgp.md": {
	id: "bgp.md";
  slug: "bgp";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cisco-asa-fortinet-and-vlans.md": {
	id: "cisco-asa-fortinet-and-vlans.md";
  slug: "cisco-asa-fortinet-and-vlans";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"create-resource-groups-with-azure-cli.md": {
	id: "create-resource-groups-with-azure-cli.md";
  slug: "create-resource-groups-with-azure-cli";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"creating-vms-in-azure.md": {
	id: "creating-vms-in-azure.md";
  slug: "creating-vms-in-azure";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ddos-attack.md": {
	id: "ddos-attack.md";
  slug: "ddos-attack";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"dhcp-and-routing-with-fortinet-firewall.md": {
	id: "dhcp-and-routing-with-fortinet-firewall.md";
  slug: "dhcp-and-routing-with-fortinet-firewall";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"dhcp-server-on-a-cisco-router.md": {
	id: "dhcp-server-on-a-cisco-router.md";
  slug: "dhcp-server-on-a-cisco-router";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"etherchannel-from-a-noob.md": {
	id: "etherchannel-from-a-noob.md";
  slug: "etherchannel-from-a-noob";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"first-lab-lab-i.md": {
	id: "first-lab-lab-i.md";
  slug: "first-lab-lab-i";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"goal.md": {
	id: "goal.md";
  slug: "goal";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hacking-into-a-kioptrix-lvl_1-server.md": {
	id: "hacking-into-a-kioptrix-lvl_1-server.md";
  slug: "hacking-into-a-kioptrix-lvl_1-server";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hello-world.md": {
	id: "hello-world.md";
  slug: "hello-world";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hsrp-done-by-a-noob.md": {
	id: "hsrp-done-by-a-noob.md";
  slug: "hsrp-done-by-a-noob";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ipv6.md": {
	id: "ipv6.md";
  slug: "ipv6";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"lab-2.md": {
	id: "lab-2.md";
  slug: "lab-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mpls-basic-lab.md": {
	id: "mpls-basic-lab.md";
  slug: "mpls-basic-lab";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multiple-spanning-tree-802-1s.md": {
	id: "multiple-spanning-tree-802-1s.md";
  slug: "multiple-spanning-tree-802-1s";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nat-overload.md": {
	id: "nat-overload.md";
  slug: "nat-overload";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"office-lab-pt-2fortinet-ospf-dhcp-relay-and-policies.md": {
	id: "office-lab-pt-2fortinet-ospf-dhcp-relay-and-policies.md";
  slug: "office-lab-pt-2fortinet-ospf-dhcp-relay-and-policies";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"office-lab-pt-3dmz-waf-web-vpn-aaasyslog.md": {
	id: "office-lab-pt-3dmz-waf-web-vpn-aaasyslog.md";
  slug: "office-lab-pt-3dmz-waf-web-vpn-aaasyslog";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"office-lab-sim-pt-1.md": {
	id: "office-lab-sim-pt-1.md";
  slug: "office-lab-sim-pt-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ospf-bgp-mpls-vrf-with-ansible.md": {
	id: "ospf-bgp-mpls-vrf-with-ansible.md";
  slug: "ospf-bgp-mpls-vrf-with-ansible";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ospf-eigrp-and-bgp.md": {
	id: "ospf-eigrp-and-bgp.md";
  slug: "ospf-eigrp-and-bgp";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ospf-troubleshooting-pt-2.md": {
	id: "ospf-troubleshooting-pt-2.md";
  slug: "ospf-troubleshooting-pt-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ospf-troubleshooting-pt-3.md": {
	id: "ospf-troubleshooting-pt-3.md";
  slug: "ospf-troubleshooting-pt-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ospf-troubleshooting.md": {
	id: "ospf-troubleshooting.md";
  slug: "ospf-troubleshooting";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"port-security-on-a-cisco-switch.md": {
	id: "port-security-on-a-cisco-switch.md";
  slug: "port-security-on-a-cisco-switch";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"routing-between-vlans-with-roas.md": {
	id: "routing-between-vlans-with-roas.md";
  slug: "routing-between-vlans-with-roas";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"routing.md": {
	id: "routing.md";
  slug: "routing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"spanning-tree-protocol-for-ccnp.md": {
	id: "spanning-tree-protocol-for-ccnp.md";
  slug: "spanning-tree-protocol-for-ccnp";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"the-routing-table.md": {
	id: "the-routing-table.md";
  slug: "the-routing-table";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vlans-and-trunks-pt-1.md": {
	id: "vlans-and-trunks-pt-1.md";
  slug: "vlans-and-trunks-pt-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vlans-with-ansible.md": {
	id: "vlans-with-ansible.md";
  slug: "vlans-with-ansible";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
