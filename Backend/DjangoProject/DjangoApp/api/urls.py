from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, AddressViewSet, CartViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, base_name='Items',)
router.register(r'address', AddressViewSet, base_name='Address')
router.register(r'cart', CartViewSet, base_name='Cart')
router.register(r'order', OrderViewSet, base_name='Order')

urlpatterns = router.urls
