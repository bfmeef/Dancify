import { Separator } from "@components/ui/separator";
import {TMessage } from "@type/feedbacks";

export default function Description({
  message,
}: {
  message: TMessage[];
  }) {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="mb-4 text-xl font-bold">평가 메시지</h2>
        <Separator className="mb-3" />

        <ul className="col-start m-0 list-none gap-1 rounded-md border px-2 py-1">
          {message.map((msg, index) => (
            <li key={index}>
              <span>- {msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}