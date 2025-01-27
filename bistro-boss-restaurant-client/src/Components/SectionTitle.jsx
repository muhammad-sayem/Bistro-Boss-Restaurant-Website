const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="w-4/12 mx-auto text-center my-8">
            <h3 className="text-[#D99904] py-3"> {subHeading} </h3>
            <h2 className="text-3xl border-y-4 py-3 uppercase"> {heading} </h2>
        </div>
    );
};

export default SectionTitle;