import { getCategoryDetails } from "@/lib/api";
import ArticleContainer from "@/ui/articles/ArticleContainer";
import { playfair } from "@/ui/fonts";
import Button from "@/ui/shared/Button";
import PageContainer from "@/ui/shared/PageContainer";
import PopularTags from "@/ui/tags/PopularTags";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type PageProps = {
    params: {
        category: string;
    };
};

export default async function CategoryDetailsPage({ params }: PageProps) {
    const { category } = await params;
    const categoryDetails = await getCategoryDetails(category);

    if (!categoryDetails) return <div></div>;

    return (
        <PageContainer className="space-y-24">
            {/* Breadcrumb & Category Summary */}
            <div className="w-full mt-24 flex flex-col items-start gap-6">
                <Button label="Categories" startIcon={<ChevronLeft />} href="/categories" type="ghost" />

                {/* Cover Image */}
                <div className="w-full h-40 relative">
                    <Image
                        src={categoryDetails.image}
                        alt={`${categoryDetails.name} category cover image`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                {/* Heading and Metadata */}
                <div className="w-full flex flex-col gap-4 items-start">
                    <h1 className={`${playfair.className} text-4xl font-bold text-primary`}>{categoryDetails.name}</h1>
                    <h6 className="font-semibold">{categoryDetails.number_of_articles} Articles</h6>
                    <p className="text-muted-foreground">{categoryDetails.description}</p>
                </div>
            </div>

            {/* Featured */}
            <div className="w-full flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Featured</h2>
                <div className="flex flex-col md:flex-row gap-12">
                    {categoryDetails.trending_articles.map((article, index) => (
                        <ArticleContainer key={`${article.slug}-${index}`} {...article} size="sm" />
                    ))}
                </div>
            </div>

            {/* Trending */}
            <div className="w-full flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Trending</h2>
                <div className="flex flex-col md:flex-row gap-12">
                    {categoryDetails.trending_articles.map((article, index) => (
                        <ArticleContainer key={`${article.slug}-${index}`} {...article} size="sm" />
                    ))}
                </div>
            </div>

            {/* Popular Tags */}
            <PopularTags />

            {/* View All Articles */}
            <div className="w-full">
                <Button
                    label={`View articles in ${categoryDetails.name}`}
                    size="lg"
                    href=""
                    type="ghost"
                    endIcon={<ChevronRight />}
                />
            </div>
        </PageContainer>
    );
}
