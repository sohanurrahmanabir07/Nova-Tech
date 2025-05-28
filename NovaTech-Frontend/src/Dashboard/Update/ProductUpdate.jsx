import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const ProductUpdate = ({ item }) => {
    const [images, setImages] = useState([]); // Can be strings (existing URLs) or File objects
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [specs, setSpecs] = useState([]); // Array of { key, value }

    const [loading, setLoading] = useState(false);
    const { setCategories, categories, products, setProducts } = useOutletContext();
    const fileInputRef = useRef();

    useEffect(() => {
        if (item && item._id) {
            setImages(item.imageUrl || []);
            setName(item.name || '');
            setModel(item.model || '');
            setDescription(item.description || '');
            setCategory(item.category || '');

            // Convert incoming format to {key, value} pair
            const formattedSpecs = Array.isArray(item.techSpec)
                ? item.techSpec.map(obj => {
                    const key = Object.keys(obj)[0];
                    return { key, value: obj[key] };
                })
                : [];
            setSpecs(formattedSpecs);
        }
    }, [item]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...specs];
        updatedSpecs[index][field] = value;
        setSpecs(updatedSpecs); // ensures reactivity and correct data binding
    };

    const addSpecField = () => setSpecs(prev => [...prev, { key: '', value: '' }]);

    const removeSpecField = (index) => setSpecs(prev => prev.filter((_, i) => i !== index));

    const removeImage = (index) => setImages(prev => prev.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length || !name || !model || !description || !category) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }

        const formData = new FormData();

        // Append existing image URLs separately so backend knows what to retain
        images.forEach(img => {
            if (typeof img === 'string') {
                formData.append('existingImages', img); // Already uploaded
            } else {
                formData.append('images', img); // New file to be uploaded
            }
        });

        // Convert {key, value} -> { key: value } structure
        const transformedSpecs = specs
            .filter(({ key, value }) => key && value)
            .map(({ key, value }) => ({ [key]: value }));

        const info = {
            name,
            model,
            description,
            category,
            techSpec: transformedSpecs
        };

        formData.append('info', JSON.stringify(info));

        setLoading(true);

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/updateProduct/${item._id}`,
                formData
            );

            if (res.status === 200) {
                setProducts(res.data.data);
                Swal.fire({ icon: "success", title: "Updated Successfully" });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!item) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div>
            <input type="checkbox" id={`ProductUpdate-${item?._id}`} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box relative">
                    <div className="modal-action absolute -top-6 right-4">
                        <label htmlFor={`ProductUpdate-${item?._id}`} className='cursor-pointer'>
                            <FontAwesomeIcon icon={faXmark} size='lg' />
                        </label>
                    </div>

                    <section className='space-y-4'>
                        <input value={model} onChange={(e) => setModel(e.target.value)} className='border p-2 w-full' placeholder='Model Name' />
                        <input value={name} onChange={(e) => setName(e.target.value)} className='border p-2 w-full' placeholder='Product Name' />
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='border p-2 w-full' placeholder='Description' />

                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 w-full'>
                            <option disabled value=''>Select Category</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat.name}>{capitalizeWords(cat.name)}</option>
                            ))}
                        </select>

                        {/* Tech Specs */}
                        <div className='space-y-2'>
                            {specs.map((spec, i) => (
                                <div key={i} className='flex space-x-2 items-center'>
                                    <input value={spec.key} onChange={(e) => handleSpecChange(i, 'key', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Key' />
                                    <input value={spec.value} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Value' />
                                    <button type="button" onClick={() => removeSpecField(i)} className='btn btn-sm btn-error'>−</button>
                                </div>
                            ))}
                            <button type="button" className='btn btn-sm btn-primary' onClick={addSpecField}>+ Add Spec</button>
                        </div>

                        {/* Image Previews */}
                        <div className="flex flex-wrap gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="relative">
                                    <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} className="w-24 h-24 object-cover rounded-md shadow" />
                                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => removeImage(i)}>✕</button>
                                </div>
                            ))}
                        </div>

                        {/* File input */}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className='border p-2 w-full' accept="image/*" multiple />

                        <button onClick={handleSubmit} className='btn btn-secondary w-full'>
                            Update {loading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
