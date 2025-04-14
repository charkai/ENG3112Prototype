const PersonalCard = () => {

    return (
        <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div class="bg-white rounded shadow p-6 m-4 w-full ">
                <div class="mb-4">
                    <h1 class="text-purple-700 font-bold text-3xl">Personal To-do List</h1>
                </div>
                <div>
                    <div class="flex mb-4 items-center">
                        <p class="w-full text-grey-darkest">Cook pasta for the family</p>
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:bg-green-200">Complete</button>
                        <button class="flex-no-shrink p-2 ml-2 border-2 rounded hover:bg-red-100">Remove</button>
                    </div>
                    <div class="flex mb-4 items-center">
                        <p class="w-full line-through">Watch the AFL with my friends</p>
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:bg-green-200">Complete</button>
                        <button class="flex-no-shrink p-2 ml-2 border-2 rounded hover:bg-red-100">Remove</button>
                    </div>
                    <div class="flex mb-4 items-center">
                        <p class="w-full">Go to Woolworths and check out the sweet deals</p>
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:bg-green-200">Complete</button>
                        <button class="flex-no-shrink p-2 ml-2 border-2 rounded hover:bg-red-100">Remove</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PersonalCard;