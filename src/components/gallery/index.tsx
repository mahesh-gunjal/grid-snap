// src/App.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ImageBox from '../image-box';
import { secondaryText } from '../../utils/styles';

export interface ImageItem {
    url: string;
    span: boolean | SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT
}

export enum SPAN_TYPE {
    LEFT = "left",
    RIGHT = "right"
}
const Gallery: React.FC = () => {
    const [items, setItems] = useState<ImageItem[]>([
        {
            url: '',
            span: false
        },
        {
            url: '',
            span: false,
        },
        {
            url: '',
            span: false,
        },
        {
            url: '',
            span: false,
        },
    ]); // Your list of image items
    const [itemsPerRow, setItemsPerRow] = useState(4); // Initial items per row in the grid

    const handleExpand = (index: number, spanType: SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT | boolean) => {
        const bit = spanType === SPAN_TYPE.LEFT ? -1 : 1;
        const updatedItems = [...items];

        // Remove the item at the adjacent index to the current index
        updatedItems.splice(index + bit, 1);

        const newIndex = spanType === SPAN_TYPE.LEFT ? -1 : 0;

        // Update the span for the current item
        updatedItems[index + newIndex].span = spanType;

        setItems(updatedItems);
    };

    const handleShrink = (index: number, spanType: SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT | boolean) => {
        console.log(index, spanType);
        const bit = spanType === SPAN_TYPE.RIGHT ? index + 1 : index;
        const updatedItems = [...items];
        updatedItems[index].span = false;

        // Insert an empty item at the adjacent index to the current index
        updatedItems.splice(bit, 0, {
            url: '',
            span: false
        });

        setItems(updatedItems);
    };

    // Function to handle expanding column span
    const handleColspan = (index: number, spanType: SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT | boolean) => {
        console.log("Hi ==>", spanType);
        if (items[index].span) {
            handleShrink(index, spanType);
            return;
        }
        handleExpand(index, spanType)
    };

    // Function to add new image item (for example purposes)
    const addImage = (index: number) => {
        const updatedItems = [...items];
        updatedItems[index].url = 'https://picsum.photos/536/354';

        if (items.length - index <= 4) {
            const additionalItems = Array.from({ length: 4 }, () => ({
                url: '',
                span: false,
            }));
            updatedItems.push(...additionalItems);
        }

        setItems(updatedItems);
    };

    // Function to remove image item (for example purposes)
    const removeImage = (index: number) => {
        const newItems = [...items];
        newItems[index].url = ''
        const lastEightItems = newItems.slice(-8);
        const allHaveEmptyUrl = lastEightItems.every(item => !item.url);

        allHaveEmptyUrl ? setItems(newItems.slice(0, -4)) : setItems(newItems);
    };


    return (
        <div>

            <div className="min-h-screen flex justify-center items-center">
                <div className="w-full max-w-screen-lg mx-auto">
                    <div className='text-left mb-5'>
                        <h3>Upload Images Here</h3>
                        <p className={secondaryText}>Individaully upload image to each grid cell by selecting and enhancing your gallery with a personal touch.</p>
                    </div>
                    <div className="grid-container">
                        {items.map((item, index) => {
                            let boxWidthClass = ''; // Initialize box width class
                            const isLeftArrowButtonVisible = !item.span && index > 0 && !!items[index - 1]?.url;
                            const isRightArrowButtonVisible = !item.span && index < items.length - 1 && !!items[index + 1]?.url;
                            // Check if the current element is the second (index === 1) and apply the width-doubling class
                            if (item.span) {
                                boxWidthClass = 'col-span-2'; // Tailwind class to make width 50% of the parent container
                            }

                            return (
                                <div key={uuidv4()} className={`rounded-md ${boxWidthClass} grid-item`}>
                                    <ImageBox
                                        imageItem={items[index]} // Pass the image source here
                                        index={index}
                                        itemsPerRow={itemsPerRow}
                                        handleColspan={handleColspan}
                                        addImage={addImage}
                                        removeImage={() => removeImage(index)}
                                        hideLeftArrowButton={isLeftArrowButtonVisible}
                                        hideRightArrowButton={isRightArrowButtonVisible}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
