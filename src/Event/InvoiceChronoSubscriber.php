<?php

namespace App\Event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
Use App\Entity\Invoice;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security   = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method  = $event->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method === "POST") {
            $next_chrono = $this->repository->getNextChrono($this->security->getUser());
            $invoice->setChrono($next_chrono);

            if (empty($invoice->getSentAt())) {
                $invoice->setSentAt(new \Datetime());
            }
        }
    }
}