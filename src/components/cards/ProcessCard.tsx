interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessCard({ number, title, description }: ProcessCardProps) {
  return (
    <div className="text-center">
      <div className="text-h2 text-pink mb-4">{number}</div>
      <h3 className="text-h4 text-white mb-3">{title}</h3>
      <p className="text-body text-slate">{description}</p>
    </div>
  );
}
