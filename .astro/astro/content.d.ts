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
		"authorities": {
"aorn-2026-perioperative-guidelines.md": {
	id: "aorn-2026-perioperative-guidelines.md";
  slug: "aorn-2026-perioperative-guidelines";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"apic-text-environmental-services.md": {
	id: "apic-text-environmental-services.md";
  slug: "apic-text-environmental-services";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"cdc-hicpac-environmental-guidelines.md": {
	id: "cdc-hicpac-environmental-guidelines.md";
  slug: "cdc-hicpac-environmental-guidelines";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"cms-conditions-of-participation.md": {
	id: "cms-conditions-of-participation.md";
  slug: "cms-conditions-of-participation";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"cms-state-operations-manual.md": {
	id: "cms-state-operations-manual.md";
  slug: "cms-state-operations-manual";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"dnv-gl-niaho-standards.md": {
	id: "dnv-gl-niaho-standards.md";
  slug: "dnv-gl-niaho-standards";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"epa-ipm-toolkit-2021.md": {
	id: "epa-ipm-toolkit-2021.md";
  slug: "epa-ipm-toolkit-2021";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"esacc-bce-credential.md": {
	id: "esacc-bce-credential.md";
  slug: "esacc-bce-credential";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"fda-food-code-2022.md": {
	id: "fda-food-code-2022.md";
  slug: "fda-food-code-2022";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"fgi-guidelines-design-construction.md": {
	id: "fgi-guidelines-design-construction.md";
  slug: "fgi-guidelines-design-construction";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"hai-cost-exposure-framing.md": {
	id: "hai-cost-exposure-framing.md";
  slug: "hai-cost-exposure-framing";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"joint-commission-2026-pe-chapter.md": {
	id: "joint-commission-2026-pe-chapter.md";
  slug: "joint-commission-2026-pe-chapter";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"nacmcf-1997-haccp-prerequisite.md": {
	id: "nacmcf-1997-haccp-prerequisite.md";
  slug: "nacmcf-1997-haccp-prerequisite";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"osha-hazard-communication.md": {
	id: "osha-hazard-communication.md";
  slug: "osha-hazard-communication";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"usda-7cfr110-rescission.md": {
	id: "usda-7cfr110-rescission.md";
  slug: "usda-7cfr110-rescission";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"usp-797-sterile-compounding.md": {
	id: "usp-797-sterile-compounding.md";
  slug: "usp-797-sterile-compounding";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"usp-800-hazardous-drugs.md": {
	id: "usp-800-hazardous-drugs.md";
  slug: "usp-800-hazardous-drugs";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"utah-r432-100-hospital-licensure.md": {
	id: "utah-r432-100-hospital-licensure.md";
  slug: "utah-r432-100-hospital-licensure";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"utah-r68-7-pesticide-applicator.md": {
	id: "utah-r68-7-pesticide-applicator.md";
  slug: "utah-r68-7-pesticide-applicator";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
"vha-directive-1850-02.md": {
	id: "vha-directive-1850-02.md";
  slug: "vha-directive-1850-02";
  body: string;
  collection: "authorities";
  data: InferEntrySchema<"authorities">
} & { render(): Render[".md"] };
};
"deficiencies": {
"a-0700-physical-environment.md": {
	id: "a-0700-physical-environment.md";
  slug: "a-0700-physical-environment";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"a-0701-buildings.md": {
	id: "a-0701-buildings.md";
  slug: "a-0701-buildings";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"a-0722-facilities.md": {
	id: "a-0722-facilities.md";
  slug: "a-0722-facilities";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"a-0747-infection-prevention-and-control.md": {
	id: "a-0747-infection-prevention-and-control.md";
  slug: "a-0747-infection-prevention-and-control";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"a-0749-infection-prevention-and-control-program.md": {
	id: "a-0749-infection-prevention-and-control-program.md";
  slug: "a-0749-infection-prevention-and-control-program";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"a-0750-sanitary-environment.md": {
	id: "a-0750-sanitary-environment.md";
  slug: "a-0750-sanitary-environment";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"ec-02-02-01-hazardous-materials-and-waste.md": {
	id: "ec-02-02-01-hazardous-materials-and-waste.md";
  slug: "ec-02-02-01-hazardous-materials-and-waste";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"ec-02-06-01-safe-functional-environment.md": {
	id: "ec-02-06-01-safe-functional-environment.md";
  slug: "ec-02-06-01-safe-functional-environment";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"pe-01-01-01-safe-adequate-environment.md": {
	id: "pe-01-01-01-safe-adequate-environment.md";
  slug: "pe-01-01-01-safe-adequate-environment";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
"pe-02-01-01-hazardous-materials-and-waste.md": {
	id: "pe-02-01-01-hazardous-materials-and-waste.md";
  slug: "pe-02-01-01-hazardous-materials-and-waste";
  body: string;
  collection: "deficiencies";
  data: InferEntrySchema<"deficiencies">
} & { render(): Render[".md"] };
};
"topics": {
"pesticide-storage-requirements-healthcare-facilities.md": {
	id: "pesticide-storage-requirements-healthcare-facilities.md";
  slug: "pesticide-storage-requirements-healthcare-facilities";
  body: string;
  collection: "topics";
  data: InferEntrySchema<"topics">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
