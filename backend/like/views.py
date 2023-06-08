from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, DestroyAPIView, get_object_or_404

from .models import Like
from .serializers import LikePostDeleteSerializer


class LikeView(CreateAPIView, DestroyAPIView):
    """
    POST 요청을 받아 좋아요를 처리함
    만약 한 유저가 같은 게시글에 좋아요를 누를 시
    좋아요가 취소되는 기능을 제공함
    ___
    - postCategory: 게시글 카테고리 (FREE | VIDEO | DANCER)
    """
    queryset = Like.objects.all()
    serializer_class = LikePostDeleteSerializer
    lookup_field = 'post_id'

    def create(self, request, post_id, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if Like.objects.filter(user_id=self.request.user,
                               post_id=post_id).exists():
            return super().destroy(request, *args, **kwargs)

        try:
            serializer.save(user=self.request.user, post_id=post_id)

            return Response(status=status.HTTP_201_CREATED)
        except PermissionError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
