'use client'

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"


// local artwork for each tech logo, matched by keyword in the Stripe product name
const LOCAL_IMAGES = [
    ['react', 'ReactJS'],
    ['next', 'NextJS'],
    ['node', 'NodeJS'],
    ['postgres', 'PostgreSQL'],
    ['docker', 'Docker'],
    ['firebase', 'Firebase'],
    ['html', 'CSS_HTML_Javascript'],
    ['css', 'CSS_HTML_Javascript'],
    ['javascript', 'CSS_HTML_Javascript'],
]

function getLocalImage(name) {
    const lowerName = name.toLowerCase()
    const match = LOCAL_IMAGES.find(([keyword]) => lowerName.includes(keyword))
    return match ? match[1] : null
}

export default function Products(props) {
    const { planner, stickers } = props
    const [portalImage, setPortalImage] = useState(null)

    const { handleIncrementProduct, cart } = useProducts()
    console.log(cart)

    if (!stickers.length && !planner) { return null }

    return (
        <>
            {portalImage && (
                <Portal handleClosePortal={() => { setPortalImage(null) }}>
                    <div className="portal-content">
                        <img className="img-display" src={portalImage} alt="product-high-res" />
                    </div>
                </Portal>
            )}
            {planner && (<div className="section-container" id="planner">
                <div className="section-header">
                    <h2>Shop Our Selection</h2>
                    <p>From organisation or accessorization</p>
                </div>

                <div className="planner-container">
                    <div>
                        <button onClick={() => {
                            setPortalImage('med_res/planner.jpeg')
                        }} className="img-button">
                            <img src="low_res/planner.jpeg" alt="high-res-planner" />
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">
                            {planner.name}
                        </p>
                        <h3><span>$</span>{((planner.prices?.[0]?.unit_amount ?? 1499) / 100).toFixed(2)}</h3>
                        <p>Step into a realm of fantasy and organization with our <strong>Medieval Dragon Month Planner</strong>! This high-resolution PNG asset combines the fierce elegance of dragons with intricate medieval designs to create a planner that's not only functional but also a work of art. Whether you&apos;re jotting down quests, planning battles, or just scheduling your weekly grocery run, this planner is your ultimate companion.</p>
                        <ul>
                            <li><strong>Epic Dragon Artwork:</strong> Stunning hand-drawn dragon motifs and medieval-inspired borders make every month feel legendary.
                            </li>
                            <li>
                                <strong>Fully Printable:</strong> Designed at ultra-high resolution, it&apos;s perfect for printing on any size paper, from A4 to poster-sized displays.
                            </li>
                        </ul>
                        <div className="purchase-btns">
                            <button onClick={() => {
                                const plannerPriceId = planner.default_price
                                handleIncrementProduct(plannerPriceId, 1, planner)
                            }}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>)}


            {stickers.length > 0 && (<div className="section-container" id="posters">
                <div className="section-header">
                    <h2>Tech Logo Posters</h2>
                    <p>Hand-drawn posters of your favourite tech logos</p>
                </div>
                <div className="sticker-container">
                    {stickers.map((sticker, stickerIndex) => {
                        const stickerName = sticker.name
                        const stickerImgUrl = getLocalImage(sticker.name)
                        const lowResSrc = stickerImgUrl ? `low_res/${stickerImgUrl}.jpeg` : sticker.images?.[0]
                        const highResSrc = stickerImgUrl ? `med_res/${stickerImgUrl}.jpeg` : sticker.images?.[0]
                        return (
                            <div key={stickerIndex} className="sticker-card">
                                <button onClick={() => {
                                    setPortalImage(highResSrc)
                                }} className="img-button">
                                    <img src={lowResSrc} alt={`${stickerName}-low-res`} />
                                </button>
                                <div className="sticker-info">
                                    <p className="text-medium">{stickerName}</p>
                                    <p>{sticker.description}</p>
                                    <h4><span>$</span>{((sticker.prices[0]?.unit_amount ?? 0) / 100).toFixed(2)}</h4>
                                    <button onClick={() => {
                                        const stickerPriceId = sticker.default_price
                                        handleIncrementProduct(stickerPriceId, 1, sticker)
                                    }}>Add to cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>)}
        </>
    )
}