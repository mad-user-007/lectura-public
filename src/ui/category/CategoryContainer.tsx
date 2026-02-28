import { getCategories } from "@/lib/api";
import Category from "./Category";

type Props = {
    query: string;
    page: number;
};

export default async function CategoryContainer({ page = 1, query = "" }: Props) {
    const { items: categories } = await getCategories({ page, query });
    return (
        <>
            {categories.length ? (
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <Category {...cat} key={cat.name} />
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}
