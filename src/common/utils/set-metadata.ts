export type Metadata = {
	title?: string;
	description?: string;
	keywords?: Array<string>;
};
export function setMetadata({
	title,
	description,
	keywords = []
}: Metadata): void {
	const titleTag = document.querySelector("title");
	const descriptionMetaTag = document.querySelector(
		"meta[name='description']"
	);
	const keywordsMetaTag = document.querySelector("meta[name='keywords']");

	if (titleTag) {
		titleTag.innerText = String(title);
	}
	if (descriptionMetaTag) {
		descriptionMetaTag.setAttribute("content", String(description));
	}
	if (keywordsMetaTag && Array.isArray(keywords)) {
		keywordsMetaTag.setAttribute("content", keywords.join(","));
	}
}
