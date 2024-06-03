import React, { useContext } from 'react';
import Contextpage from '../Contextpage';
import Button from '../assets/Btn';
import { HiChevronUp } from "react-icons/hi";

export const Pagebtn = () => {

    const { setPage, page } = useContext(Contextpage);

    return (
        <div className="page-btn-container flex justify-center items-center">
            <a href="#" onClick={() => setPage(page - 1)} className="page-btn">
                <Button item="Back" />
            </a>
            <div className="page-number">{page}</div>
            <a href="#" onClick={() => setPage(page + 1)} className="page-btn">
                <Button item="Next" />
            </a>
        </div>
    );
};

