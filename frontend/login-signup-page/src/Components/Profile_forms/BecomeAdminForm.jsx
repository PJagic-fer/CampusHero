import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';

const BecomeAdminForm = () => { 
    
    const  {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmitAdmin = async() =>{
            console.log("prijava za admina nije još dostupna");
        }

    return(
        <div className ="become-admin-container">
            <h3 className='h3-profile'>Postani Campus Hero administrator</h3>
            <form className="become-admin-form" onSubmit={handleSubmit(onSubmitAdmin)}>
                <div className ="become-admin-item-container">
                    <label className="become-admin-label">O meni...</label>
                    <textarea
                        {...register("personal_info",{
                            required: "Ovo polje je obavezno"
                        })}
                        placeholder='Predstavi nam se'
                        className="become-admin-textarea"
                    />
                    {errors.personal_info && (<div className="error-message">{errors.personal_info.message}</div>)}
                </div>
                <div className ="become-admin-item-container">
                    <label className="become-admin-label">Iskustva s Campus Hero</label>
                    <textarea
                        {...register("experiences",{
                            required: "Ovo polje je obavezno"
                        })}
                        placeholder='Koja su tvoja dosadašnja iskustva s Campus Hero projektom'
                        className="become-admin-textarea"
                    />
                    {errors.experiences && (<div className="error-message">{errors.experiences.message}</div>)}
                </div>
                <div className ="become-admin-item-container">
                    <label className="become-admin-label">Vlastite sposobnosti</label>
                    <textarea
                        {...register("competencies",{
                            required: "Ovo polje je obavezno"
                        })}
                        placeholder='Zašto baš ti zaslužuješ ovu ulogu'
                        className="become-admin-textarea"
                    />
                    {errors.competencies && (<div className="error-message">{errors.competencies.message}</div>)}
                </div>
                <p className="text-italic">S velikom moći dolazi velika odgovornost!</p>
                <div className='submit-button-container'>
                    <button className="button-profile submit" type="submit">Pošalji prijavu</button>
                </div>
            </form>
        </div>
    );
};

export default BecomeAdminForm;