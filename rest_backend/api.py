
from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from rest.views import RoomViewSet, ParticipatorListViewSet, ParticipatorViewSet, EventViewSet


class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass


router = NestedDefaultRouter()
freighters_router = router.register('room', RoomViewSet)
feature_router = router.register('participator', ParticipatorViewSet)
air_router = router.register('event', EventViewSet).register(
                        'participators', ParticipatorListViewSet,
                        basename='event-participators',
                        parents_query_lookups=['veranstaltung']
                    )
