//------------------------------------
//              ARTICLE
//------------------------------------
export type ArticleBase = {
    slug: string;
    title: string;
    category: CategoryBase;
    description: string;
    metadata: ArticleMetadataDetails[];
};

export type ArticleSummary = ArticleBase & {
    tags: Tag[];
};

export type ArticleMetadataDetails = {
    type: "views" | "duration" | "published_on";
    value: string;
};

//------------------------------------
//             TAG
//------------------------------------
export type Tag = {
    name: string;
    slug: string;
};

//------------------------------------
//             CATEGORY
//------------------------------------
export type CategoryBase = {
    slug: string;
    name: string;
};

export type CategorySummary = CategoryBase & {
    description: string;
    number_of_articles: string;
    image: string;
};

export type CategoryDetailed = CategorySummary & {
    trending_articles: ArticleBase[];
    featured_articles: ArticleBase[];
};
