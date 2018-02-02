import React, { Component } from 'react';
import data from './../MasterData';

class Input extends Component {
    render() {
        let info = { ...this.props };
        let userType = info.userType;
        switch (userType) {
            case 'text':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required className={info.class} type={info.type} name={info.name} placeholder={info.label} onChange={info.handleChange} />                        
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <textarea className={info.class} type={info.type} name={info.name} placeholder={info.label} onChange={info.handleChange} />
                            
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'select':
                return (
                    <div className="field">
                        <div className="control">
                        <label className="label">{info.label}</label>
                            <div className={info.class}>
                                <select name={info.name} type={info.type} onChange={info.handleChange} >
                                    <option> --- </option>
                                    {
                                        info.options.map((o, i) => {
                                            return (
                                                <option value={o} key={i}>{o}</option>
                                            )
                                        })}
                                </select>
                                
                            </div>
                            
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'number':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required className={info.class} name={info.name} min="1" type={info.type} onChange={info.handleChange} />                             
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'password':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required className={info.class} placeholder={info.label} name={info.name} type={info.type} onChange={info.handleChange} />                            
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'email':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required placeholder={info.label} className={info.class} name={info.name} type={info.type} onChange={info.handleChange} />
                            
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'time':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required placeholder={info.label} className={info.class} name={info.name} type={info.type} onChange={info.handleChange} />
                            
                        </div>
                        <p className="help is-success">{info.message}</p>
                    </div>
                )
            case 'datalist':
                return (
                    <div className="field">
                        <div className="control">
                            <label className="label">{info.label}</label>
                            <input required className={info.class} name={info.name} type={info.type} onChange={info.handleChange} list={info.list} />
                            <datalist id={info.list}>
                                {
                                    info.options.map((o, i) => {
                                        return (
                                            <option value={o} key={i}>{o}</option>
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                    </div>
                )
            default:
            return null
        }

    }
}

export default Input;