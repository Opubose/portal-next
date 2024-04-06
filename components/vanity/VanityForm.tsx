import { useForm, Controller } from 'react-hook-form';
import { VanityLink } from '@generated/type-graphql';
import { gqlQueries } from 'src/api';
import VanityPopUp from './VanityPopUp';
import { useState } from 'react';

const vanityDomainOptions = ['content', 'survey', 'apply', 'rsvp', 'join'];

export default function VanityForm() {
  const { register, handleSubmit, control, setValue } = useForm<Omit<VanityLink, 'id'>>({
    defaultValues: {
      vanityDomain: 'content',
    },
  });

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [vanitySuccess, setVanitySuccess] = useState(false);
  const [formData, setFormData] = useState<Omit<VanityLink, 'id'>>();
  const [errMsg, setErrMsg] = useState<string>();

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  return (
    <div className="w-full grid place-items-center px-3 relative">
      <div className="flex flex-col p-10 place-items-center">
        <div className="text-3xl font-semibold text-gray-100">create a vanity link</div>
      </div>
      <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
        <VanityPopUp
          vals={formData}
          success={vanitySuccess}
          errMsg={errMsg}
          isOpen={isPopUpOpen}
          onClose={handlePopUp}
        />
        <form
          className="w-full"
          onSubmit={handleSubmit(async (vals) => {
            try {
              await gqlQueries.createVanityLink({
                data: vals,
              });
              setFormData(vals);
              setVanitySuccess(true);
            } catch (error) {
              setVanitySuccess(false);
              console.error(error);
              const errMsg = (error as any).response.errors[0].message;
              setErrMsg(
                typeof errMsg === 'string'
                  ? errMsg
                  : 'unknown reason. Please reach out to an admin for assistance.',
              );
            }

            handlePopUp();
          })}
        >
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">
                original link
              </label>
              <p className="text-gray-200">This could be a zoom link, drive shortcut, anything</p>
              <input
                className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                placeholder="https://acmutd.co/"
                {...register('originalUrl')}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">
                vanity domain
              </label>
              <p className="text-gray-200">
                This is what goes at the beginning, eg. content.acmutd.co or survey.acmutd.co
              </p>
              <Controller
                name="vanityDomain"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-x-3">
                    {vanityDomainOptions.map((option, idx) => (
                      <button
                        onClick={() => setValue('vanityDomain', option)}
                        type="button"
                        key={idx}
                        className={`p-2 text-white rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r ${
                          option === field.value
                            ? 'from-[#3952d7] to-[#31d372]'
                            : 'bg-transparent border border-gray-600'
                        } transform hover:scale-110`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              ></Controller>
            </div>
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">slashtag</label>
              <div>
                <p className="text-gray-200">What appears after content.acmutd.co/</p>
                <p className="text-gray-200">
                  Eg. mentor, mentee, projects, dev, research, industry
                </p>
              </div>
              <input
                className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                placeholder="cool-slashtag"
                {...register('slashtag')}
                required
              />
            </div>

            <div className="flex gap-x-2 p-3">
              <button
                className="bg-gradient-to-r from-pink-700 to-purple-700 text-center py-2 px-6 font-bold text-white"
                type="submit"
              >
                save
              </button>
              <a className=" text-center py-2 px-6 font-bold text-white" href="/admin">
                cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
