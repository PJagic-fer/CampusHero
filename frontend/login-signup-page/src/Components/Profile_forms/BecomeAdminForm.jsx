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
            <h1>Postani Campus Hero administrator</h1>
            <form className="become-admin-form" onSubmit={handleSubmit(onSubmitAdmin)}>
                <label>O meni...</label>
                <textarea
                    {...register("personal_info",{
                        required: "Ovo polje je obavezno je obavezno"
                    })}
                    placeholder='Predstavi nam se'
                />
                {errors.personal_info && (<div className="error-message">{errors.personal_info.message}</div>)}
                <label>Iskustva s Campus Hero</label>
                <textarea
                    {...register("experiences",{
                        required: "Ovo polje je obavezno je obavezno"
                    })}
                    placeholder='Koja su tvoja dosadašnja iskustva s Campus Hero projektom'
                />
                {errors.experiences && (<div className="error-message">{errors.experiences.message}</div>)}
                <label>Vlastite sposobnosti</label>
                <textarea
                    {...register("competencies",{
                        required: "Ovo polje je obavezno je obavezno"
                    })}
                    placeholder='Zašto baš ti zaslužuješ ovu ulogu'
                />
                {errors.competencies && (<div className="error-message">{errors.competencies.message}</div>)}
                <p>S velikom moći dolazi velika odgovornost!</p>
                <button type="submit">Pošalji prijavu</button>
            </form>
        </div>
    );
};

export default BecomeAdminForm;