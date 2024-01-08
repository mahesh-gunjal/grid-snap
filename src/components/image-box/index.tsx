// src/components/ImageBox.tsx
import React, { useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { ImageItem, SPAN_TYPE } from '../gallery';
import LeftIcon from '../arrow-icons/left-icon';
import RightIcon from '../arrow-icons/right-icon';
import { secondaryText } from '../../utils/styles';

interface ImageBoxProps {
    imageItem: ImageItem;
    addImage: (index: number) => void;
    removeImage: (index: number) => void;
    index: number;
    itemsPerRow: number;
    handleColspan: (index: number, spanType: SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT | boolean) => void;
    hideLeftArrowButton: boolean;
    hideRightArrowButton: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
    imageItem,
    addImage,
    removeImage,
    index,
    itemsPerRow,
    handleColspan,
    hideLeftArrowButton,
    hideRightArrowButton
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const isLeftButtonVisible = hideLeftArrowButton || index % itemsPerRow === 0;
    const isRightButtonVisible = hideRightArrowButton || (index + 1) % itemsPerRow === 0;

    const span = imageItem.span;

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleAddImage = () => {
        addImage(index)
    }

    const handleRemoveImage = () => {
        removeImage(index);
    }

    return (
        <div
            className={`relative h-40 rounded-md overflow-hidden`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {imageItem.url ? (
                <div className="relative h-full">
                    <img src={imageItem.url} alt="Gallery Item" className="w-full h-full object-cover" />
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-between px-2 bg-black bg-opacity-50">
                            <LeftIcon
                                index={index}
                                span={SPAN_TYPE.LEFT}
                                className={isLeftButtonVisible ? "invisible" : ""}
                                handleColspan={handleColspan}
                                rotateIcon={!span}
                                title={!span ? "Expand to left" : "Contract to right"}
                            />
                            <Trash2 size={24} color="#FFF" className="cursor-pointer" onClick={handleRemoveImage} />
                            <RightIcon
                                index={index}
                                span={SPAN_TYPE.RIGHT}
                                className={isRightButtonVisible ? "invisible" : ""}
                                handleColspan={handleColspan}
                                rotateIcon={!span}
                                title={!span ? "Expand to Right" : "Contract to Left"}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className={`w-full h-full bg-gray-300 flex justify-center items-center cursor-pointer`}
                    onClick={handleAddImage}
                >
                    {isHovered && !imageItem.url &&
                        <div className="flex flex-col items-center justify-center">
                            <ImagePlus size={24} color="#98A2B3" />
                            <p className={secondaryText}>Add Image</p>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default ImageBox;
