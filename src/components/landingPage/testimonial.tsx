import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const Testimonial = ({
  name,
  initials,
  profilePic,
  testimonial,
}: {
  name: string;
  initials: string;
  profilePic: string;
  testimonial: string;
}) => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-col items-center space-y-4 p-10 text-center">
          <Avatar>
            <AvatarImage src={profilePic} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400">{testimonial}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonial;
