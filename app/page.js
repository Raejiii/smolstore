import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// fetch products from Stripe on every request so catalogue changes show up immediately
export const dynamic = 'force-dynamic'

export async function getProducts() {
    try {

        const baseURL = process.env.NEXT_PUBLIC_BASE_URL
        const response = await fetch(baseURL + '/api/products')
        const products = await response.json()
        return products
    } catch (err) {
        console.log(err.stack)
        console.log(err.message)
        return []
    }
}

export default async function Home(props) {
    const products = await getProducts()

    let planner = null
    let stickers = []


    for (let product of products) {
        // the featured product is the D&D character sheet (or a planner)
        const lowerName = product.name.toLowerCase()
        if (lowerName.includes('character sheet') || lowerName.includes('planner')) {
            planner = product
            continue
        }
        stickers.push(product)
    }


    return (
        < >
            <ImageBanner />
            <section>
                <Products planner={planner} stickers={stickers} />
            </section>
        </>
    );
}
