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
                    <h2>For Adventurers</h2>
                    <p>A hand-drawn sheet for your next campaign</p>
                </div>

                <div className="planner-container">
                    <div>
                        <button onClick={() => {
                            setPortalImage('med_res/character_sheet.jpeg')
                        }} className="img-button">
                            <img src="low_res/character_sheet.jpeg" alt="Custom D&D character sheet" />
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">
                            {planner.name}
                        </p>
                        <h3><span>$</span>{((planner.prices?.[0]?.unit_amount ?? 1499) / 100).toFixed(2)}</h3>
                        <p>Roll up your next hero on our <strong>Custom D&amp;D Character Sheet</strong>! This high-resolution printable sheet wraps every stat, skill and saving throw in ornate hand-drawn flourishes, so your character looks as legendary on paper as they do at the table.</p>
                        <ul>
                            <li><strong>Everything in one page:</strong> Ability scores, skills, saving throws, hit points, death saves, coin purses, weapons, spellcasting, traits and feats.
                            </li>
                            <li>
                                <strong>Fully Printable:</strong> Designed at high resolution, so it prints crisply on A4 or US Letter paper.
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