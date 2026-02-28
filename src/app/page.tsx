import BrowseByCategory from "@/ui/home/BrowseByCategory";
import Featured from "@/ui/home/FeaturedSection";
import HeroSection from "@/ui/home/HeroSection";
import RecentArticles from "@/ui/home/RecentArticles";
import PageContainer from "@/ui/shared/PageContainer";

export default function HomePage() {
    return (
        <PageContainer className="space-y-36">
            <HeroSection />
            <Featured />
            <BrowseByCategory />
            <RecentArticles />
        </PageContainer>
    );
}
